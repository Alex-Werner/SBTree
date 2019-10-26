const _ = require('lodash');
const RemoveCommand = require('./RemoveCommand');
const {validTypes} = require('../../../constants')

// Returns difference between object. Do not return addition/deletion between object, only diff when existing in both
function findChangedFields(object, base) {
  function changes(object, base) {
    return _.transform(object, function(result, value, key) {
      if (base[key]!== undefined && !_.isEqual(value, base[key])) {
        result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(object, base);
}
function findAddedFields(object, base) {
  function addedChanges(object, base) {
    return _.transform(object, function(result, value, key) {
      if (!base[key]) {
        result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
      }
    });
  }
  return addedChanges(object, base);
}
function findDeletedFields(object, base) {
  return findAddedFields(base, object);
}


//FIXME : Major improvements in perf to be made here.
//Did naive implementation to bootstrap it.
async function replace(currentDocument, newDocument) {
  if (!newDocument._id) {
    throw new Error('Expecting document to have an _id');
  }
  const id = newDocument._id.toString();

  // We detect added fields from current document
  const addedFields = findAddedFields(newDocument, currentDocument);
  const changedField = findChangedFields(newDocument, currentDocument);
  const deletedFields = findDeletedFields(newDocument, currentDocument);

  // We add all extra fields
  for (const _addedFieldName in addedFields){
    const _addedFieldValue = newDocument[_addedFieldName];
    const _addedFieldType = typeof _addedFieldValue;

    if (validTypes.includes(_addedFieldType)) {
      if(_addedFieldName !== '_id'){
        if (!this.getFieldTree(_addedFieldName)) {
          this.setFieldTree({fieldName:_addedFieldName});
        }
        const fieldTree = this.getFieldTree(_addedFieldName);
        if(fieldTree){
          await fieldTree.insert(id, _addedFieldValue);
        }
      }
    }else{
      this.verbose && console.log(`No index for ${_addedFieldName} : Typeof ${_addedFieldType} : ${JSON.stringify(_addedFieldValue)}`)
    }
  }

  const remCmd = new RemoveCommand({
    _id: currentDocument._id,
    ...deletedFields
  });

  // And delete whose we need to delete
  for (const _deletedFieldName in deletedFields){
    const _deletedFieldValue = currentDocument[_deletedFieldName];
    const _deletedFieldType = typeof _deletedFieldValue;

    if (validTypes.includes(_deletedFieldType)) {
      if(_deletedFieldName !== '_id'){
        if (!this.getFieldTree(_deletedFieldName)) {
          this.setFieldTree({fieldName:_deletedFieldName});
        }
        const fieldTree = this.getFieldTree(_deletedFieldName);
        if(!fieldTree){
          throw new Error(`Missing fieldTree for ${_deletedFieldName}`)
        }
        await fieldTree.remove(remCmd);
      }
    }else{
      this.verbose && console.log(`No index for ${_deletedFieldName} : Typeof ${_deletedFieldType} : ${JSON.stringify(_deletedFieldValue)}`)
    }
  }

  // And finally update current field that changed
  for (const _changedFieldName in changedField) {
    const _changedFieldValue = currentDocument[_changedFieldName];
    const _changedFieldType = typeof _changedFieldValue;

    if (validTypes.includes(_changedFieldType)) {
      if(_changedFieldName !== '_id'){
        if (!this.getFieldTree(_changedFieldName)) {
          this.setFieldTree({fieldName:_changedFieldName});
        }
        const fieldTree = this.getFieldTree(_changedFieldName);
        if(!fieldTree){
          throw new Error(`Missing fieldTree for ${_changedFieldName}`)
        }

        const res = {_id:currentDocument._id};

        // RemoveCommand need current value as it will be used for deletion
        res[_changedFieldName]=currentDocument[_changedFieldName];
        const remCmd = new RemoveCommand(res);

        // Remove current value
        await fieldTree.remove(remCmd);
        // Insert new value
        await fieldTree.insert(id, _changedFieldValue);
      }
    }else{
      this.verbose && console.log(`No index for ${_changedFieldName} : Typeof ${_changedFieldType} : ${JSON.stringify(_changedFieldValue)}`)
    }
  }
  await this.adapter.replaceDocument(newDocument);
  return newDocument
};
module.exports = replace;

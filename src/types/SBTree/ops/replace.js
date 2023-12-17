const isEqual = require('lodash.isequal');
const get = require('lodash.get');
const isObject = require('lodash.isobject');
const transform = require('lodash.transform');
const RemoveCommand = require('./RemoveCommand');
const { validTypes } = require('../../../constants');

// Returns difference between object. Do not return addition/deletion between object, only diff when existing in both
function findChangedFields(object, base) {
  function changes(object, base) {
    return transform(object, (result, value, key) => {
      if (base[key] !== undefined && !isEqual(value, base[key])) {
        result[key] = (isObject(value) && isObject(base[key])) ? changes(value, base[key]) : value;
      }
    });
  }

  return changes(object, base);
}

function findAddedFields(object, base) {
  function addedChanges(object, base) {
    return transform(object, (result, value, key) => {
      if (base[key] === undefined) {
        result[key] = (isObject(value) && isObject(base[key])) ? addedChanges(value, base[key]) : value;
      }
    });
  }

  return addedChanges(object, base);
}

function findDeletedFields(object, base) {
  return findAddedFields(base, object);
}

// FIXME : Major improvements in perf to be made here.
// Did naive implementation to bootstrap it.
async function replace(currentDocument, newDocument) {
  const self = this;

  if (!newDocument._id) {
    throw new Error('Expecting document to have an _id');
  }
  const id = newDocument._id.toString();

  // We detect added fields from current document
  const addedFields = findAddedFields(newDocument, currentDocument);
  const changedField = findChangedFields(newDocument, currentDocument);
  const deletedFields = findDeletedFields(newDocument, currentDocument);

  // We add all extra fields
  for (const _addedFieldName in addedFields) {
    const _addedFieldValue = newDocument[_addedFieldName];
    const _addedFieldType = typeof _addedFieldValue;

    if (validTypes.includes(_addedFieldType)) {
      if (_addedFieldName !== '_id') {
        if (!this.getFieldTree(_addedFieldName)) {
          this.setFieldTree({ fieldName: _addedFieldName });
        }
        const fieldTree = this.getFieldTree(_addedFieldName);
        if (fieldTree) {
          await fieldTree.insert(id, _addedFieldValue);
        }
      }
    } else {
      this.verbose && console.log(`No index for ${_addedFieldName} : Typeof ${_addedFieldType} : ${JSON.stringify(_addedFieldValue)}`);
    }
  }

  const remCmd = new RemoveCommand({
    _id: currentDocument._id,
    ...deletedFields,
  });

  // And delete whose we need to delete
  for (const _deletedFieldName in deletedFields) {
    const _deletedFieldValue = currentDocument[_deletedFieldName];
    const _deletedFieldType = typeof _deletedFieldValue;

    if (validTypes.includes(_deletedFieldType)) {
      if (_deletedFieldName !== '_id') {
        if (!this.getFieldTree(_deletedFieldName)) {
          this.setFieldTree({ fieldName: _deletedFieldName });
        }
        const fieldTree = this.getFieldTree(_deletedFieldName);
        if (!fieldTree) {
          throw new Error(`Missing fieldTree for ${_deletedFieldName}`);
        }
        await fieldTree.remove(remCmd);
      }
    } else {
      this.verbose && console.log(`No index for ${_deletedFieldName} : Typeof ${_deletedFieldType} : ${JSON.stringify(_deletedFieldValue)}`);
    }
  }
  // Sorry. But was the easiest and quickiest way to do nested things.
  // Will refactor, hopefully.
  const replaceProp = async function (_fieldName, _fieldValue) {
    const _fieldType = typeof _fieldValue;
    if (['number', 'string', 'boolean'].includes(_fieldType)) {
      if (!self.getFieldTree(_fieldName)) {
        self.setFieldTree({ fieldName: _fieldName });
      }
      const fieldTree = self.getFieldTree(_fieldName);

      if (!fieldTree) {
        throw new Error(`Missing fieldTree for ${_fieldName}`);
      }
      const res = { _id: currentDocument._id };
      // RemoveCommand need current value as it will be used for deletion

      //Alternative without using lodash.set
      res[_fieldName] = currentDocument[_fieldName];

      const remCmd = new RemoveCommand(res);

      // Remove current value
      await fieldTree.remove(remCmd);

      // Insert new value
      await fieldTree.insert(id, get(newDocument, `${_fieldName}`));
    } else if (_fieldType === 'object' && !Array.isArray(_fieldType)) {
      for (const _nestedFieldName in _fieldValue) {
        const _nestedFieldValue = _fieldValue[_nestedFieldName];
        await replaceProp(`${_fieldName}.${_nestedFieldName}`, _fieldValue[_nestedFieldName]);
      }
    } else {
      throw new Error(`Not supported type : ${_fieldType}`);
    }
  };

  // And finally update current field that changed
  for (const _changedFieldName in changedField) {
    const _changedFieldValue = currentDocument[_changedFieldName];
    const _changedFieldType = typeof _changedFieldValue;

    if (validTypes.includes(_changedFieldType)) {
      await replaceProp(_changedFieldName, _changedFieldValue);
    } else {
      this.verbose && console.log(`No index for ${_changedFieldName} : Typeof ${_changedFieldType} : ${JSON.stringify(_changedFieldValue)}`);
    }
  }
  await this.adapter.replaceDocument(newDocument);
  return newDocument;
}
module.exports = replace;

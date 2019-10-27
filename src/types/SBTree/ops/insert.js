const {validTypes} = require('../../../constants');
async function insert(document) {
  if(!document){
    throw new Error('Cannot insert empty document');
  }
  if (!document._id) {
    throw new Error('Expecting all document to have an _id');
  }

  const id = document._id.toString();

  for (const _fieldName in document) {
    const _fieldValue = document[_fieldName];

    const _fieldType = typeof _fieldValue;

    if (validTypes.includes(_fieldType)) {
      // When we have to deal with a nested object
      if(_fieldType==='object' && !Array.isArray(_fieldType)){
        // Then we create a nested field tree for each field of the nested object

        const self = this;
        const insertNested = async function(_fieldName, _fieldValue){
          for(const _propName in _fieldValue){
            if (!self.getFieldTree(`${_fieldName}.${_propName}`)) {
              self.setFieldTree({fieldName:`${_fieldName}.${_propName}`});
            }
            const fieldTree = self.getFieldTree(`${_fieldName}.${_propName}`);
            if(fieldTree){
              if(typeof _fieldValue[_propName] === 'object' && !Array.isArray(_fieldValue)){
                for(const _childPropName in _fieldValue[_propName]){
                  await insertNested(`${_fieldName}.${_propName}`, _fieldValue[_propName]);
                }
              }else{
                await fieldTree.insert(id, _fieldValue[_propName]);
              }
            }
          }
        }

        await insertNested(_fieldName, _fieldValue);
      }else{
        if(_fieldName !== '_id'){
          if (!this.getFieldTree(_fieldName)) {
            this.setFieldTree({fieldName:_fieldName});
          }
          const fieldTree = this.getFieldTree(_fieldName);
          if(fieldTree){
            await fieldTree.insert(id, _fieldValue);
          }
        }
      }

    }else{
      this.verbose && console.log(`No index for ${_fieldName} : Typeof ${_fieldType} : ${JSON.stringify(_fieldValue)}`)
    }
  }
  await this.adapter.saveDocument(document);
};
module.exports = insert;

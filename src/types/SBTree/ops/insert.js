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

    if (['string','number'].includes(_fieldType)) {
      if(_fieldName !== '_id'){
        if (!this.getFieldTree(_fieldName)) {
          this.setFieldTree({fieldName:_fieldName});
        }
        const fieldTree = this.getFieldTree(_fieldName);
        if(fieldTree){
          await fieldTree.insert(id, _fieldValue);
        }
      }
    }else{
      this.verbose && console.log(`No index for ${_fieldName} : Typeof ${_fieldType} : ${JSON.stringify(_fieldValue)}`)
    }
  }
  await this.adapter.saveDocument(document);
};
module.exports = insert;

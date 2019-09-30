const {map} = require('lodash')

async function insert(document) {
  if (!document._id) {
    throw new Error('Expecting all document to have an _id');
  }

  const id = document._id.toString();

  for (const _fieldName in document) {
    const _fieldValue = document[_fieldName]
    if (_fieldName !== '_id') {
      if (!this.getFieldTree(_fieldName)) {
        this.setFieldTree(_fieldName);
      }
      const fieldTree = this.getFieldTree(_fieldName);
      if(fieldTree){
        await fieldTree.insert(id, _fieldValue);
      }
    }
  }
  await this.adapter.saveDocument(document);
};
module.exports = insert;

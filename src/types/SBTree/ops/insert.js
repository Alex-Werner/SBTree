const {map}=require('lodash')
async function insert(document) {
  if (!document._id) {
    throw new Error('Expecting all document to have an _id');
  }

  const id = document._id.toString();

  await Promise.all(map(document, async (_field, _fieldName) => {
        if(_fieldName!=='_id'){
          if (!this.getFieldTree(_fieldName)) {
            this.setFieldTree(_fieldName);
          }
          const fieldNode = this.getFieldTree(_fieldName);
          await fieldNode.insert(_field, id);
        }
      }
  ));
};
module.exports = insert;

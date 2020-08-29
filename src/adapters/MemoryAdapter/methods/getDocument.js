const {cloneDeep}= require('lodash');
module.exports = async function getDocument(identifier) {
  const doc = this.documents[identifier];
  if (!doc) {
    return {};
  }
  return cloneDeep(doc);
};

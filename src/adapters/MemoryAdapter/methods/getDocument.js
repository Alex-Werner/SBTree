const cloneDeep = require('lodash.clonedeep');

export default async function getDocument(identifier) {
  const doc = this.documents[identifier];
  if (!doc) {
    return null;
  }
  return cloneDeep(doc);
};

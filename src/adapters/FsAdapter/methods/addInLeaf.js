const {insertSorted} = require('../../../utils/array');

async function addInLeaf(leafName, field, identifier, key) {

  if (!this.leafs[leafName]) {
    await this.createLeaf(leafName);
  }

  const index = await this.insertSortedInLeaf(leafName, key)
  this.leafs[leafName].meta.size += 1;
  this.leafs[leafName].meta.identifiers.splice(index, 0, identifier);
  console.dir(this.leafs, {depth: null})

  const doc = {
    _id: identifier,
  };
  doc[field] = key;
  await this.updateDocument(doc)
  throw new Error('Not Implemented');

  // const index = insertSorted(this.leafs[leafName].data.keys, key);
  //
  // if(!this.documents[identifier]){
  //   this.documents[identifier] = {_id: identifier}
  // }
  // this.documents[identifier][field] = key;
}

module.exports = addInLeaf;

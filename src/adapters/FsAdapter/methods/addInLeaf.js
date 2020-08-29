const { insertSorted } = require('../../../utils/array');

async function addInLeaf(leafName, identifier, value) {
  if (!this.leafs[leafName]) {
    await this.createLeaf(leafName);
  }
  if (this.leafs[leafName].meta.identifiers.includes(identifier)) {
    // TODO : except unique:false?
    throw new Error(`Identifier ${identifier} already exist`);
  }
  const index = await this.insertSortedInLeaf(leafName, value);
  this.leafs[leafName].meta.size += 1;
  this.leafs[leafName].meta.identifiers.splice(index, 0, identifier);

  // const doc = {
  //   _id: identifier,
  // };
  // doc[field] = key;
  // await this.updateDocument(doc)
}

module.exports = addInLeaf;

const {insertSorted} = require('../../../utils/array');

async function addInLeaf(leafName, field, identifier, key) {

  if (!this.leafs[leafName]) {
    console.log('will', leafName)
    await this.createLeaf(leafName);
    console.log('continue')
  }
  console.log('wait?')
  const index = await this.insertSortedInLeaf(leafName, key)
  this.leafs[leafName].meta.size += 1;
  this.leafs[leafName].meta.identifiers.splice(index, 0, identifier);
  console.dir(this.leafs, {depth: null})

  const doc = {
    _id: identifier,
  };
  doc[field] = key;
  await this.updateDocument(doc)
}

module.exports = addInLeaf;

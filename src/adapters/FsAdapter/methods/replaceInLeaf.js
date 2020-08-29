const { insertSorted } = require('../../../utils/array');

async function replaceInLeaf(leafId, identifier, value) {
  if (!this.leafs[leafId].meta.identifiers.includes(identifier)) {
    // TODO : except unique:false?
    throw new Error(`Identifier ${identifier} do not exist`);
  }

  const index = this.leafs[leafId].meta.identifiers.indexOf(identifier);
  const data = await this.openLeafData(leafId);
  data.keys[index] = value;
  await this.saveLeafData(leafId, data);
  return index;
}

module.exports = replaceInLeaf;

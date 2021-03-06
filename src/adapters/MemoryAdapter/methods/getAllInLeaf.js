const cloneDeep = require('lodash.clonedeep');

module.exports = async function getAllInLeaf(leafId) {
  const leaf = this.leafs[leafId];
  return cloneDeep({ identifiers: leaf.meta.identifiers, keys: leaf.data.keys });
};

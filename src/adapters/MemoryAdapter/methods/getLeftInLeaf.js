const cloneDeep = require('lodash.clonedeep');

module.exports = async function getLeftInLeaf(leafId){
  const leaf = this.leafs[leafId];

  const {meta, data} = leaf;
  const {identifiers} = meta;

  const identifier = identifiers[0];
  const key = data.keys[0];

  return cloneDeep({identifier, key })
}

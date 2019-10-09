const {clone} = require('lodash');

module.exports = async function getLeftInLeaf(leafId){
  const leaf = this.leafs[leafId];

  const {meta, data} = leaf;
  const {identifiers} = meta;

  const identifier = identifiers[0];
  const key = data.keys[0];

  return clone({identifier, key })
}

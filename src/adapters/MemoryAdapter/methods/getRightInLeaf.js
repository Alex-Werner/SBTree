const {clone} = require('lodash');

module.exports = async function getRightInLeaf(leafId){
  const leaf = this.leafs[leafId];

  const len = leaf.meta.identifiers.length;
  const identifier = leaf.meta.identifiers[len-1];
  const key = leaf.data.keys[len-1];

  return clone({identifier, key })
}

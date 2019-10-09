const {clone} = require('lodash');

module.exports = async function getAllInLeaf(leafId){
  const leaf = this.leafs[leafId];
  return clone({identifiers:leaf.meta.identifiers, keys:leaf.data.keys })
}

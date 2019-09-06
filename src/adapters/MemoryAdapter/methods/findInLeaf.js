const getStrictMatchingKeys = require('./ops/getStrictMatchingKeys');
const lowerThanKeys = require('./ops/lowerThanKeys');
const greaterThanKeys = require('./ops/greaterThanKeys');
module.exports = async function findInLeaf(leafName, key, op = '$eq'){
  const strictMatchingKeys = getStrictMatchingKeys(this.leafs[leafName].data.keys, key);
  switch (op) {
    case "$eq":
      if(!strictMatchingKeys.length){
        return [];
      }
      const start = strictMatchingKeys[0];
      const end = strictMatchingKeys[0]+strictMatchingKeys.length;
      return this.leafs[leafName].meta.identifiers.slice(start, end);
      break;
    case "$lte":
      let resLte = [];
      resLte = resLte.concat(await this.findInLeaf(leafName, key, '$lt'));
      resLte = resLte.concat(await this.findInLeaf(leafName, key, '$eq'));
      return resLte;
    case "$lt":
      if(strictMatchingKeys.length){
        const localIndex = this.leafs[leafName].data.keys.indexOf(key);
        return (localIndex===0) ? [] : this.leafs[leafName].meta.identifiers.slice(0, localIndex-1);
      }else{
        const keys = lowerThanKeys(this.leafs[leafName].data.keys, key);
        return this.leafs[leafName].meta.identifiers.slice(0, keys.length);
      }
    case "$gt":
      if(strictMatchingKeys.length){
        const localIndex = this.leafs[leafName].data.keys.indexOf(key);
        return (localIndex===-1) ? [] : this.leafs[leafName].meta.identifiers.slice(localIndex+strictMatchingKeys.length);
      }else{
        const keys = greaterThanKeys(this.leafs[leafName].data.keys, key);
        const len = (keys.length<=0) ? 0 : keys.length;
        return (len===0) ? [] :this.leafs[leafName].meta.identifiers.slice(-len);
      }
    case "$gte":
      let resGte = [];
      resGte = resGte.concat(await this.findInLeaf(leafName, key, '$eq'));
      resGte = resGte.concat(await this.findInLeaf(leafName, key, '$gt'));
      return resGte;
    default:
      throw new Error(`Not supported op ${op}`);
  }
}

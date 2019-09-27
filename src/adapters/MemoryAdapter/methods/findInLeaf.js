const getStrictMatchingKeys = require('./ops/getStrictMatchingKeys');
const lowerThanKeys = require('./ops/lowerThanKeys');
const greaterThanKeys = require('./ops/greaterThanKeys');
module.exports = async function findInLeaf(leafId, value, op = '$eq'){
  if(!this.leafs[leafId]){
    throw new Error(`Trying to search in non-existing leafId ${leafId}`);
  }

  console.log(leafId, value, op)
  console.dir(this.leafs, {depth:null})
  const strictMatchingKeys = getStrictMatchingKeys(this.leafs[leafId].data.keys, value);
  switch (op) {
    case "$eq":
      console.log(this.leafs[leafId])
      console.log(strictMatchingKeys)
      if(!strictMatchingKeys.length){
        return [];
      }
      const start = strictMatchingKeys[0];
      const end = strictMatchingKeys[0]+strictMatchingKeys.length;
      return this.leafs[leafId].meta.identifiers.slice(start, end);
      break;
    case "$lte":
      let resLte = [];
      resLte = resLte.concat(await this.findInLeaf(leafId, value, '$lt'));
      resLte = resLte.concat(await this.findInLeaf(leafId, value, '$eq'));
      return resLte;
    case "$lt":
      if(strictMatchingKeys.length){
        const localIndex = this.leafs[leafId].data.keys.indexOf(value);
        return (localIndex===0) ? [] : this.leafs[leafId].meta.identifiers.slice(0, localIndex-1);
      }else{
        const keys = lowerThanKeys(this.leafs[leafId].data.keys, value);
        return this.leafs[leafId].meta.identifiers.slice(0, keys.length);
      }
    case "$gt":
      if(strictMatchingKeys.length){
        const localIndex = this.leafs[leafId].data.keys.indexOf(value);
        return (localIndex===-1) ? [] : this.leafs[leafId].meta.identifiers.slice(localIndex+strictMatchingKeys.length);
      }else{
        const keys = greaterThanKeys(this.leafs[leafId].data.keys, value);
        const len = (keys.length<=0) ? 0 : keys.length;
        return (len===0) ? [] :this.leafs[leafId].meta.identifiers.slice(-len);
      }
    case "$gte":
      let resGte = [];
      resGte = resGte.concat(await this.findInLeaf(leafId, value, '$eq'));
      resGte = resGte.concat(await this.findInLeaf(leafId, value, '$gt'));
      return resGte;
    default:
      throw new Error(`Not supported op ${op}`);
  }
}

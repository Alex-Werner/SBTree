const getStrictMatchingKeys = require('./ops/getStrictMatchingKeys');
const lowerThanKeys = require('./ops/lowerThanKeys');
const greaterThanKeys = require('./ops/greaterThanKeys');
module.exports = async function findInLeaf(leafId, value, op = '$eq'){
  if(!this.leafs[leafId]){
    throw new Error(`Trying to search in non-existing leafId ${leafId}`);
  }
  const result = {
    identifiers:[],
    keys:[]
  };

  const strictMatchingKeys = getStrictMatchingKeys(this.leafs[leafId].data.keys, value);
  switch (op) {
    case "$eq":
      if(!strictMatchingKeys.length){
        return result;
      }
      const start = strictMatchingKeys[0];
      const end = strictMatchingKeys[0]+strictMatchingKeys.length;

      result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(start, end));
      result.keys.push(...this.leafs[leafId].data.keys.slice(start, end));

      return result;
      // return this.leafs[leafId].meta.identifiers.slice(start, end);
      break;
    case "$lte":
      let resLte = [];
      resLte = resLte.concat(await this.findInLeaf(leafId, value, '$lt'));
      resLte = resLte.concat(await this.findInLeaf(leafId, value, '$eq'));
      resLte.forEach((res)=>{
        result.identifiers.push(...res.identifiers)
        result.keys.push(...res.keys)
      })
      // throw new Error('Modification to new format')
      // return resLte;
      return result;
    case "$lt":
      if(strictMatchingKeys.length){
        const localIndex = this.leafs[leafId].data.keys.indexOf(value);
        if(localIndex!==0){
          result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(0, localIndex));
          result.keys.push(...this.leafs[leafId].data.keys.slice(0, localIndex));
        }
        // return (localIndex===0) ? [] : this.leafs[leafId].meta.identifiers.slice(0, localIndex-1);
      }else{
        const keys = lowerThanKeys(this.leafs[leafId].data.keys, value);
        result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(0, keys.length));
        result.keys.push(...this.leafs[leafId].data.keys.slice(0, keys.length));
        // return this.leafs[leafId].meta.identifiers.slice(0, keys.length);
      }
      return result;
    case "$gt":
      if(strictMatchingKeys.length){
        const localIndex = this.leafs[leafId].data.keys.indexOf(value);
        if(localIndex !== -1){
          result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(localIndex+strictMatchingKeys.length));
          result.keys.push(...this.leafs[leafId].data.keys.slice(localIndex+strictMatchingKeys.length));
        }
      }else{
        const keys = greaterThanKeys(this.leafs[leafId].data.keys, value);
        const len = keys.length;
        if(leafId!==0 && len>0){
          result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(-len));
          result.keys.push(...this.leafs[leafId].data.keys.slice(-len));
        }
      }
      return result;
    case "$gte":
      let resGte = [];
      resGte = resGte.concat(await this.findInLeaf(leafId, value, '$eq'));
      resGte = resGte.concat(await this.findInLeaf(leafId, value, '$gt'));
      resGte.forEach((res)=>{
        result.identifiers.push(...res.identifiers)
        result.keys.push(...res.keys)
      })
      // throw new Error('Modification to new format')
      // return resGte;
      return result;
    default:
      throw new Error(`Not supported op ${op}`);
  }
}

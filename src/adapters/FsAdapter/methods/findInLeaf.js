const getStrictMatchingKeys = require('./ops/getStrictMatchingKeys');
const lowerThanKeys = require('./ops/lowerThanKeys');
const greaterThanKeys = require('./ops/greaterThanKeys');
module.exports = async function findInLeaf(leafName, key, op = '$eq') {
  let {keys} = await this.openLeafData(leafName);
  if (!keys) {
    console.error(`Leafname ${leafName} was not present, had to recreate`)
    await this.createLeaf(leafName);
    return this.findInLeaf(leafName, key, op);
  }
  const strictMatchingKeys = getStrictMatchingKeys(keys, key);

  switch (op) {
    case "$eq":
      if(!strictMatchingKeys.length){
        return [];
      }
      const start = strictMatchingKeys[0];
      const end = strictMatchingKeys[0]+strictMatchingKeys.length;
      return this.leafs[leafName].meta.identifiers.slice(start, end);
    case "$lte":
      let resLte = [];
      resLte = resLte.concat(await this.findInLeaf(leafName, key, '$lt'));
      resLte = resLte.concat(await this.findInLeaf(leafName, key, '$eq'));
      return resLte;
    case "$gte":
      let resGte = [];
      resGte = resGte.concat(await this.findInLeaf(leafName, key, '$eq'));
      resGte = resGte.concat(await this.findInLeaf(leafName, key, '$gt'));
      return resGte;
    case "$lt":
      if(strictMatchingKeys.length){
        const localIndex = keys.indexOf(key);
        return (localIndex===0) ? [] : this.leafs[leafName].meta.identifiers.slice(0, localIndex);
      }else{
        const ltKeys = lowerThanKeys(keys, key);
        return this.leafs[leafName].meta.identifiers.slice(0, ltKeys.length);
      }
    case "$gt":
      if(strictMatchingKeys.length){
        const localIndex = keys.indexOf(key);
        return (localIndex===-1) ? [] : this.leafs[leafName].meta.identifiers.slice(localIndex+strictMatchingKeys.length);
      }else{
        const _keys = greaterThanKeys(keys, key);
        const len = (_keys.length<=0) ? 0 : _keys.length;
        return (len===0) ? [] :this.leafs[leafName].meta.identifiers.slice(-len);
      }
    default:
      throw new Error(`Unsupported operator ${op}`);
  }

}

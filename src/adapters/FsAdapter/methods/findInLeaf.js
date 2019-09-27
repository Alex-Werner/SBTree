const getStrictMatchingKeys = require('./ops/getStrictMatchingKeys');
const lowerThanKeys = require('./ops/lowerThanKeys');
const greaterThanKeys = require('./ops/greaterThanKeys');
module.exports = async function findInLeaf(leafName, value, op = '$eq') {
  let {keys} = await this.openLeafData(leafName);
  if (!keys) {
    console.error(`Leafname ${leafName} was not present, had to recreate`)
    await this.createLeaf(leafName);
    return this.findInLeaf(leafName, value, op);
  }
  const strictMatchingKeys = getStrictMatchingKeys(keys, value);

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
      resLte = resLte.concat(await this.findInLeaf(leafName, value, '$lt'));
      resLte = resLte.concat(await this.findInLeaf(leafName, value, '$eq'));
      return resLte;
    case "$gte":
      let resGte = [];
      resGte = resGte.concat(await this.findInLeaf(leafName, value, '$eq'));
      resGte = resGte.concat(await this.findInLeaf(leafName, value, '$gt'));
      return resGte;
    case "$lt":
      if(strictMatchingKeys.length){
        const localIndex = keys.indexOf(value);
        return (localIndex===0) ? [] : this.leafs[leafName].meta.identifiers.slice(0, localIndex);
      }else{
        const ltKeys = lowerThanKeys(keys, value);
        return this.leafs[leafName].meta.identifiers.slice(0, ltKeys.length);
      }
    case "$gt":
      if(strictMatchingKeys.length){
        const localIndex = keys.indexOf(value);
        return (localIndex===-1) ? [] : this.leafs[leafName].meta.identifiers.slice(localIndex+strictMatchingKeys.length);
      }else{
        const _keys = greaterThanKeys(keys, value);
        const len = (_keys.length<=0) ? 0 : _keys.length;
        return (len===0) ? [] :this.leafs[leafName].meta.identifiers.slice(-len);
      }
    default:
      throw new Error(`Unsupported operator ${op}`);
  }

}

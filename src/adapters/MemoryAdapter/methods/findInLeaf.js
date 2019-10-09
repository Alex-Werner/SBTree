const getStrictMatchingKeys = require('./ops/getStrictMatchingKeys');
const lowerThanKeys = require('./ops/lowerThanKeys');
const greaterThanKeys = require('./ops/greaterThanKeys');
module.exports = async function findInLeaf(leafId, value, op = '$eq') {
  const leaf = this.leafs[leafId];

  if (!leaf) {
    throw new Error(`Trying to search in non-existing leafId ${leafId}`);
  }
  const result = {
    identifiers: [],
    keys: []
  };
  const {keys} = leaf.data;
  const {identifiers} = leaf.meta;
  const strictMatchingKeys = getStrictMatchingKeys(keys, value);
  const strictMatchingKeysLen = strictMatchingKeys.length;
  switch (op) {
    case "$eq":
      if (!strictMatchingKeys.length) {
        return result;
      }
      const start = strictMatchingKeys[0];
      const end = strictMatchingKeys[0] + strictMatchingKeysLen;

      result.identifiers.push(...identifiers.slice(start, end));
      result.keys.push(...keys.slice(start, end));

      return result;
      // return this.leafs[leafId].meta.identifiers.slice(start, end);
      break;
    case "$lte":
      let resLte = [];
      resLte = resLte.concat(await this.findInLeaf(leafId, value, '$lt'));
      resLte = resLte.concat(await this.findInLeaf(leafId, value, '$eq'));
      resLte.forEach((res) => {
        result.identifiers.push(...res.identifiers)
        result.keys.push(...res.keys)
      })
      // throw new Error('Modification to new format')
      // return resLte;
      return result;
    case "$lt":
      if (strictMatchingKeysLen) {
        const localIndex = keys.indexOf(value);
        if (localIndex !== 0) {
          result.identifiers.push(...identifiers.slice(0, localIndex));
          result.keys.push(...keys.slice(0, localIndex));
        }
        // return (localIndex===0) ? [] : this.leafs[leafId].meta.identifiers.slice(0, localIndex-1);
      } else {
        const ltKeys = lowerThanKeys(keys, value);
        result.identifiers.push(...identifiers.slice(0, ltKeys.length));
        result.keys.push(...keys.slice(0, ltKeys.length));
        // return this.leafs[leafId].meta.identifiers.slice(0, keys.length);
      }
      return result;
    case "$gt":
      if (strictMatchingKeysLen) {
        const localIndex = keys.indexOf(value);
        if (localIndex !== -1) {
          result.identifiers.push(...identifiers.slice(localIndex + strictMatchingKeysLen));
          result.keys.push(...keys.slice(localIndex + strictMatchingKeysLen));
        }
      } else {
        const gtKeys = greaterThanKeys(keys, value);
        const len = gtKeys.length;
        if (leafId !== 0 && len > 0) {
          result.identifiers.push(...identifiers.slice(-len));
          result.keys.push(...keys.slice(-len));
        }
      }
      return result;
    case "$gte":
      let resGte = [];
      resGte = resGte.concat(await this.findInLeaf(leafId, value, '$eq'));
      resGte = resGte.concat(await this.findInLeaf(leafId, value, '$gt'));
      resGte.forEach((res) => {
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

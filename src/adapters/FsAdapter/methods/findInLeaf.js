const getStrictMatchingKeys = require('./ops/getStrictMatchingKeys');
const lowerThanKeys = require('./ops/lowerThanKeys');
const greaterThanKeys = require('./ops/greaterThanKeys');

module.exports = async function findInLeaf(leafId, value, op = '$eq') {
  const result = {
    identifiers: [],
    keys: [],
  };
  const { keys } = await this.openLeafData(leafId);
  if (!keys) {
    console.error(`leafId ${leafId} was not present, had to recreate`);
    await this.createLeaf(leafId);
    return this.findInLeaf(leafId, value, op);
  }
  const strictMatchingKeys = getStrictMatchingKeys(keys, value);

  switch (op) {
    case '$eq':
      if (!strictMatchingKeys.length) {
        return [];
      }
      const start = strictMatchingKeys[0];
      const end = strictMatchingKeys[0] + strictMatchingKeys.length;

      result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(start, end));
      result.keys.push(...keys.slice(start, end));

      return result;
      // return this.leafs[leafName].meta.identifiers.slice(start, end);
    case '$lte':
      let resLte = [];
      resLte = resLte.concat(await this.findInLeaf(leafId, value, '$lt'));
      resLte = resLte.concat(await this.findInLeaf(leafId, value, '$eq'));
      throw new Error('Modification to new format');
      return resLte;
    case '$gte':
      let resGte = [];
      resGte = resGte.concat(await this.findInLeaf(leafId, value, '$eq'));
      resGte = resGte.concat(await this.findInLeaf(leafId, value, '$gt'));
      throw new Error('Modification to new format');
      return resGte;
    case '$lt':
      if (strictMatchingKeys.length) {
        const localIndex = keys.indexOf(value);
        if (localIndex !== 0) {
          result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(0, localIndex));
          result.keys.push(...keys.slice(0, localIndex));
        }
        // return (localIndex===0) ? [] : this.leafs[leafId].meta.identifiers.slice(0, localIndex);
      } else {
        const ltKeys = lowerThanKeys(keys, value);

        result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(0, ltKeys.length));
        result.keys.push(...keys.slice(0, ltKeys.length));

        // return this.leafs[leafId].meta.identifiers.slice(0, ltKeys.length);
      }
      return result;
    case '$gt':
      if (strictMatchingKeys.length) {
        const localIndex = keys.indexOf(value);
        if (localIndex !== -1) {
          result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(localIndex + strictMatchingKeys.length));
          result.keys.push(...keys.slice(localIndex + strictMatchingKeys.length));
        }
      } else {
        const _keys = greaterThanKeys(keys, value);
        const len = (_keys.length <= 0) ? 0 : _keys.length;
        if (leafId !== 0) {
          result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(-len));
          result.keys.push(...keys.slice(-len));
        }
      }
      return result;
    default:
      throw new Error(`Unsupported operator ${op}`);
  }
};

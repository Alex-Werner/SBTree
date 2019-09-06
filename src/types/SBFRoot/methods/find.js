const findEquals = require('./ops/findEquals');
const findLowerThan = require('./ops/findLowerThan');
const findGreaterThan = require('./ops/findGreaterThan');

async function find(key, operator = '$eq'){
  switch (operator) {
    case '$eq':
      return findEquals.call(this,key);
    case '$ne':
      const findAllIdentifier = await this.findAll();
      const excludedIdentifiers = await findEquals.call(this, key);
      return findAllIdentifier.filter(id => !excludedIdentifiers.includes(id));
    case '$lte':
      return findLowerThan.call(this, key, true);
    case '$lt':
      return findLowerThan.call(this, key, false);
    case '$gt':
      return findGreaterThan.call(this, key, false);
    case '$gte':
      return findGreaterThan.call(this, key, true);
    default:
      throw new Error(`Not handled operator ${operator}`)
  }
}
module.exports = find;

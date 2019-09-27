const findEquals = require('./ops/findEquals');
const findLowerThan = require('./ops/findLowerThan');
const findGreaterThan = require('./ops/findGreaterThan');
const {xor, difference, pullAll} = require('lodash');
async function find(value, operator = '$eq'){
  const self = this;
  const p = [];
  const results = [];

  switch (operator) {
    case '$eq':
      return findEquals.call(this,value);
    case '$ne':
      const findAllIdentifier = await this.findAll();
      const excludedIdentifiers = await findEquals.call(this, value);

      excludedIdentifiers.forEach((id)=>{
        const idOf = findAllIdentifier.indexOf(id);
        if(idOf>-1){
          findAllIdentifier.splice(idOf,1);
        }
      });
      return findAllIdentifier;
    case '$lte':
      return findLowerThan.call(this, value, true);
    case '$lt':
      return findLowerThan.call(this, value, false);
    case '$gt':
      return findGreaterThan.call(this, value, false);
    case '$gte':
      return findGreaterThan.call(this, value, true);
    case '$in':
      if(!Array.isArray(value)) throw new Error(`$in operator expect key to be an array`);
      for(let el of value){
        p.push(self.find(el))
      }
      await Promise.all(p).then((resolvedP) => {
        resolvedP.forEach((p) => {
          results.push(...p);
        })
      });
      return results;
    case '$nin':
      if(!Array.isArray(value)) throw new Error(`$nin operator expect key to be an array`);

      const findAllIdentifiers = await this.findAll();
      const includingIdentifiers = await this.find(value, '$in');
      includingIdentifiers.forEach((id)=>{
        const idOf = findAllIdentifiers.indexOf(id);
        if(idOf>-1){
          findAllIdentifiers.splice(idOf,1);
        }
      })
      return findAllIdentifiers;
    default:
      throw new Error(`Not handled operator ${operator}`)
  }
}
module.exports = find;

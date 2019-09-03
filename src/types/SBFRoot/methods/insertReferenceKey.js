const {insertSorted} = require('../../../utils/array');

async function insertReferenceKey(key){
  if(this.isFull()){
    await this.split();
  }
  const index = insertSorted(this.keys, key);
  return index;
};
module.exports = insertReferenceKey

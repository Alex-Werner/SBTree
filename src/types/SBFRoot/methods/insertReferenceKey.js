const {insertSorted} = require('../../../utils/array');

async function insertReferenceKey(value){
  if(this.isFull()){
    await this.split();
  }
  const index = insertSorted(this.keys, value);
  return index;
};
module.exports = insertReferenceKey

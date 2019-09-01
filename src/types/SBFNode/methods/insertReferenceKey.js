const {insertSorted} = require('../../../utils/array');
module.exports =async function insertReferenceKey(key){
  if(this.isFull()){
    await this.split();
    throw new Error('Root is full');
  }
  const index = insertSorted(this.keys, key);
  return index;
}

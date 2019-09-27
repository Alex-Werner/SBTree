const {insertSorted} = require('../../../utils/array');
module.exports =async function insertReferenceKey(value){
  if(this.isFull()){
    await this.split();
    throw new Error('Root is full');
  }
  const index = insertSorted(this.keys, value);
  return index;
}

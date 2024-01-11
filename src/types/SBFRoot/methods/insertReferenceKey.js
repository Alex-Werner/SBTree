import {insertSorted} from '../../../utils/array.js';
async function insertReferenceKey(value) {
  if (this.isFull()) {
    await this.split();
  }
  const index = insertSorted(this.keys, value);
  return index;
}
export default insertReferenceKey;

import { insertSorted } from '../../../utils/array.js';
export default async function insertReferenceKey(value) {
  if (this.isFull()) {
    await this.split();
  }
  const index = insertSorted(this.keys, value);
  return index;
};

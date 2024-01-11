const { insertSorted } = require('../../../utils/array');

export default async function insertReferenceKey(value) {
  if (this.isFull()) {
    await this.split();
  }
  const index = insertSorted(this.keys, value);
  return index;
};

const { insertSorted } = require('../../../utils/array');

module.exports = async function insertReferenceKey(value) {
  if (this.isFull()) {
    await this.split();
  }
  const index = insertSorted(this.keys, value);
  return index;
};

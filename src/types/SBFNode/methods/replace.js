const SBFLeaf = require('../../SBFLeaf/SBFLeaf');

export default async function replace(identifier, value) {
  const { childrens, keys } = this;
  if (!childrens.length) {
    throw new Error('SBFNode cannot replace with no childrens');
  }
  let leafIndex = 0;
  keys.forEach((_key) => {
    if (value <= _key) return;
    leafIndex++;
  });
  const leaf = childrens[leafIndex];
  await leaf.replace(identifier, value);

  if (this.isFull()) {
    await this.split();
  }
};

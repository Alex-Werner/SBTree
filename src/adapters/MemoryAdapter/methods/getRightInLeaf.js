const cloneDeep = require('lodash.clonedeep');

export default async function getRightInLeaf(leafId) {
  const leaf = this.leafs[leafId];

  const { meta, data } = leaf;
  const { identifiers } = meta;

  const len = identifiers.length;
  const identifier = identifiers[len - 1];
  const key = data.keys[len - 1];

  return cloneDeep({ identifier, key });
};

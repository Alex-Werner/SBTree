async function removeInLeaf(leafId, identifier) {
  const identifiers = [];
  if (!this.leafs[leafId]) {
    throw new Error('Trying to remove in unknown leaf id')
  }
    const index = this.leafs[leafId].meta.identifiers.indexOf(identifier);
    if (index >= 0) {
      this.leafs[leafId].meta.size -= 1;
      this.leafs[leafId].meta.identifiers.splice(index, 1);
      this.leafs[leafId].data.keys.splice(index, 1);
      identifiers.push({identifier, index});
    }
  return identifiers;
}

module.exports = removeInLeaf;

async function removeInLeaf(leafName, identifier) {
  const identifiers = [];
  if (!this.leafs[leafName]) {
    throw new Error('Trying to remove in unknown leaf id')
  }
    const index = this.leafs[leafName].meta.identifiers.indexOf(identifier);
    if (index >= 0) {
      this.leafs[leafName].meta.size -= 1;
      this.leafs[leafName].meta.identifiers.splice(index, 1);
      this.leafs[leafName].data.keys.splice(index, 1);
      identifiers.push({identifier, index});
    }
  return identifiers;
}

module.exports = removeInLeaf;

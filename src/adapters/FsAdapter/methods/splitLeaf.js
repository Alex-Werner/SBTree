module.exports = async function splitLeaf(sourceLeaf, siblingLeaf) {
  if (!this.leafs[sourceLeaf.id]) {
    throw new Error(`Source leaf do not exist`)
  }
  const source = this.leafs[sourceLeaf.id];
  const leaf = this.leafs[siblingLeaf.id];
  if (!this.leafs[siblingLeaf.id]) {
    throw new Error(`Sibbling leaf do not exist`);
  }

  const sibling = await this.openLeafData(siblingLeaf.id);
  const leafData = await this.openLeafData(sourceLeaf.id);

  const midIndex = ~~(leafData.keys.length / 2);
  const rightKeys = leafData.keys.splice(midIndex);
  const rightIdentifiers = source.meta.identifiers.splice(midIndex);
  const midKey = rightKeys.slice(0, 1)[0];


  sibling.keys = rightKeys;

  leaf.meta.size = rightIdentifiers.length;
  leaf.meta.identifiers = rightIdentifiers;
  source.meta.size = source.meta.identifiers.length

  await this.saveLeafData(sourceLeaf.id, leafData);
  await this.saveLeafData(siblingLeaf.id, sibling);
  return midKey;
}

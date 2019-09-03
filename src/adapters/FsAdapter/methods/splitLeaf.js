module.exports = async function splitLeaf(sourceLeaf, siblingLeaf) {
  if (!this.leafs[sourceLeaf.name]) {
    throw new Error(`Source leaf do not exist`)
  }
  const source = this.leafs[sourceLeaf.name];
  const leaf = this.leafs[siblingLeaf.name];
  if (!this.leafs[siblingLeaf.name]) {
    throw new Error(`Sibbling leaf do not exist`);
  }

  const sibling = await this.openLeafData(siblingLeaf.name);
  const leafData = await this.openLeafData(sourceLeaf.name);

  const midIndex = ~~(leafData.keys.length / 2);
  const rightKeys = leafData.keys.splice(midIndex);
  const rightIdentifiers = source.meta.identifiers.splice(midIndex);
  const midKey = rightKeys.slice(0, 1)[0];


  sibling.keys = rightKeys;

  leaf.meta.size = rightIdentifiers.length;
  leaf.meta.identifiers = rightIdentifiers;
  source.meta.size = source.meta.identifiers.length

  await this.saveLeafData(sourceLeaf.name, leafData);
  await this.saveLeafData(siblingLeaf.name, sibling);
  return midKey;
}

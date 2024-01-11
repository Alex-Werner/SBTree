import cloneDeep from 'lodash.clonedeep';
export default async function getLeftInLeaf(leafId) {
  const { keys } = await this.openLeafData(leafId);
  if (!keys) {
    console.error(`leafId ${leafId} was not present, had to recreate`);
    await this.createLeaf(leafId);
    return this.getLeftInLeaf(leafId);
  }

  const leaf = this.leafs[leafId];
  const identifier = leaf.meta.identifiers[0];
  const key = leaf.data.keys[0];

  return cloneDeep({ identifier, key });
};

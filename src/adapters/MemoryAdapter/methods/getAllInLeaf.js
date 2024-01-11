import cloneDeep from "lodash.clonedeep";
export default async function getAllInLeaf(leafId) {
  const leaf = this.leafs[leafId];
  return cloneDeep({ identifiers: leaf.meta.identifiers, keys: leaf.data.keys });
};

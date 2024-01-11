import LeafMeta from "../types/LeafMeta/LeafMeta.js";
import LeafData from "../types/LeafData/LeafData.js";

export default async function createLeaf(leafId) {
  this.leafs[leafId] = {
    id: leafId,
    meta: new LeafMeta(),
  };

  const data = new LeafData();
  await this.saveLeafData(leafId, data);
};

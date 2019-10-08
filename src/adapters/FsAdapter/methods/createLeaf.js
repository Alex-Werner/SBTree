const LeafData = require('../types/LeafData/LeafData')
const LeafMeta = require('../types/LeafMeta/LeafMeta')
module.exports = async function createLeaf(leafId){
  this.leafs[leafId] = {
    id: leafId,
    meta: new LeafMeta()
  };

  const data = new LeafData();
  await this.saveLeafData(leafId, data)
}

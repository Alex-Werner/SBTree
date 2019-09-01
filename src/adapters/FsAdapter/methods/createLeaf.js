const LeafData = require('../types/LeafData/LeafData')
const LeafMeta = require('../types/LeafMeta/LeafMeta')
module.exports = async function createLeaf(leafName){
  this.leafs[leafName] = {
    meta: new LeafMeta()
  };

  const data = new LeafData();

  await this.saveLeafData(leafName, data)

}

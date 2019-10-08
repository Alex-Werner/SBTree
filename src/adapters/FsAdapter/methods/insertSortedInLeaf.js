const {insertSorted} = require('../../../utils/array')
module.exports = async function insertSortedInLeaf(leafId, value){
  const data = await this.openLeafData(leafId);
  if(!data || !data.keys){
    console.error(`leafId ${leafId} was not present, had to recreate`)
    await this.createLeaf(leafId);
    return this.insertSortedInLeaf(leafId, value)
  }
  const index = insertSorted(data.keys,value);
  await this.saveLeafData(leafId, data)
  return index;
}

const {insertSorted} = require('../../../utils/array')
module.exports = async function insertSortedInLeaf(leafName, value){
  const data = await this.openLeafData(leafName);
  if(!data || !data.keys){
    console.error(`Leafname ${leafName} was not present, had to recreate`)
    await this.createLeaf(leafName);
    return this.insertSortedInLeaf(leafName, value)
  }
  const index = insertSorted(data.keys,value);
  await this.saveLeafData(leafName, data)
  return index;
}

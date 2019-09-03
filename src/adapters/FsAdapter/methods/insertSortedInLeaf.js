const {insertSorted} = require('../../../utils/array')
module.exports = async function insertSortedInLeaf(leafName, key){
  const data = await this.openLeafData(leafName);
  if(!data || !data.keys){
    console.error(`Leafname ${leafName} was not present, had to recreate`)
    await this.createLeaf(leafName);
    return this.insertSortedInLeaf(leafName, key)
  }
  const index = insertSorted(data.keys,key);
  await this.saveLeafData(leafName, data)
  return index;
}

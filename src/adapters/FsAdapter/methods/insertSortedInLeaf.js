const {insertSorted} = require('../../../utils/array')
module.exports = async function insertSortedInLeaf(leafName, key){
  const data = await this.openLeafData(leafName);
  const index = insertSorted(data.keys,key);
  await this.saveLeafData(leafName, data)
  return index;
}

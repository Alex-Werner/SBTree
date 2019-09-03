function getAllIndexes(arr, val) {
  let indexes = [], i = -1;
  while ((i = arr.indexOf(val, i+1)) !== -1){
    indexes.push(i);
  }
  return indexes;
}
module.exports = async function findInLeaf(leafName, key){

  let {keys} = await this.openLeafData(leafName);
  if(!keys){
    console.error(`Leafname ${leafName} was not present, had to recreate`)
    await this.createLeaf(leafName);
    return this.findInLeaf(leafName, key);
  }
  const indexes = getAllIndexes(keys, key);
  if(!indexes.length){
    return [];
  }
  const start = indexes[0];
  const end = indexes[0]+indexes.length;
  return this.leafs[leafName].meta.identifiers.slice(start, end);
}

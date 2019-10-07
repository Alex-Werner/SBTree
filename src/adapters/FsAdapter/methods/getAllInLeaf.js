module.exports = async function getAllInLeaf(leafName){

  let {keys} = await this.openLeafData(leafName);
  if(!keys){
    console.error(`Leafname ${leafName} was not present, had to recreate`)
    await this.createLeaf(leafName);
    return this.getAllInLeaf(leafName);
  }
  return JSON.parse(JSON.stringify(this.leafs[leafName].meta.identifiers));
}

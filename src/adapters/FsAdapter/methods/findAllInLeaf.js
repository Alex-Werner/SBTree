module.exports = async function findAllInLeaf(leafName){

  let {keys} = await this.openLeafData(leafName);
  if(!keys){
    console.error(`Leafname ${leafName} was not present, had to recreate`)
    await this.createLeaf(leafName);
    return this.findAllInLeaf(leafName);
  }
  return this.leafs[leafName].meta.identifiers;
}

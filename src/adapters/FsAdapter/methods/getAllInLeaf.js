module.exports = async function getAllInLeaf(leafId){

  let {keys} = await this.openLeafData(leafId);
  if(!keys){
    console.error(`leafId ${leafId} was not present, had to recreate`)
    await this.createLeaf(leafId);
    return this.getAllInLeaf(leafId);
  }
  return JSON.parse(JSON.stringify({identifiers:this.leafs[leafId].meta.identifiers, keys:keys}));
}

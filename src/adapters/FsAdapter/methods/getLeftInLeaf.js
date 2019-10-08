module.exports = async function getLeftInLeaf(leafId){

  let {keys} = await this.openLeafData(leafId);
  if(!keys){
    console.error(`leafId ${leafId} was not present, had to recreate`)
    await this.createLeaf(leafId);
    return this.getLeftInLeaf(leafId);
  }

  const leaf = this.leafs[leafId];
  const identifier = leaf.meta.identifiers[0];
  const key = leaf.data.keys[0];

  return JSON.parse(JSON.stringify({identifier, key }))
}

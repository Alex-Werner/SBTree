module.exports = async function getLeftInLeaf(leafName){

  let {keys} = await this.openLeafData(leafName);
  if(!keys){
    console.error(`Leafname ${leafName} was not present, had to recreate`)
    await this.createLeaf(leafName);
    return this.getLeftInLeaf(leafName);
  }

  const leaf = this.leafs[leafName];
  const identifier = leaf.meta.identifiers[0];
  const key = leaf.data.keys[0];

  return {identifier, key }
}

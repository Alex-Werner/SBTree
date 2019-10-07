module.exports = async function getRightInLeaf(leafName){

  let {keys} = await this.openLeafData(leafName);
  if(!keys){
    console.error(`Leafname ${leafName} was not present, had to recreate`)
    await this.createLeaf(leafName);
    return this.getLeftInLeaf(leafName);
  }

  const leaf = this.leafs[leafName];
  const len = leaf.meta.identifiers.length;
  const identifier = leaf.meta.identifiers[len-1];
  const key = leaf.data.keys[len-1];

  return JSON.parse(JSON.stringify({identifier, key }))
}

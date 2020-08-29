const cloneDeep = require('lodash.clonedeep');

module.exports = async function getRightInLeaf(leafId){

  let {keys} = await this.openLeafData(leafId);
  if(!keys){
    console.error(`leafId ${leafId} was not present, had to recreate`)
    await this.createLeaf(leafId);
    return this.getLeftInLeaf(leafId);
  }

  const leaf = this.leafs[leafId];
  const len = leaf.meta.identifiers.length;
  const identifier = leaf.meta.identifiers[len-1];
  const key = leaf.data.keys[len-1];

  return cloneDeep({identifier, key })
}

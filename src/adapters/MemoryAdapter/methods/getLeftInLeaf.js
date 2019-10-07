module.exports = async function getLeftInLeaf(leafId){
  const leaf = this.leafs[leafId];

  const identifier = leaf.meta.identifiers[0];
  const key = leaf.data.keys[0];

  return JSON.parse(JSON.stringify({identifier, key }))
}

module.exports = async function getAllInLeaf(leafId){
  const leaf = this.leafs[leafId];
  return JSON.parse(JSON.stringify({identifiers:leaf.meta.identifiers, keys:leaf.data.keys }))
}

module.exports = async function getAllInLeaf(leafId){
  const leaf = this.leafs[leafId];
  return {identifiers:leaf.meta.identifiers, keys:leaf.data.keys }
}

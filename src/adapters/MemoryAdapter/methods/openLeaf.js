module.exports = async function openLeaf(leafName){
  if(!this.leafs[leafName]){
    throw new Error(`Leaf do not exist`);
  }
  return this.leafs[leafName];
}

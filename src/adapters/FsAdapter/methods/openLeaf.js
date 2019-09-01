module.exports = async function openLeaf(leafName){
  throw new Error('Not Implemented');
  if(!this.leafs[leafName]){
    throw new Error(`Leaf do not exist`);
  }
  return this.leafs[leafName];
}

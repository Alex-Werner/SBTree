async function remove(identifier){
  const parent = this.getParent();
  const adapter = parent.getAdapter();
  await adapter.removeInLeaf(this.name, identifier);
  const isFull = await this.isFull();


  // if(isFull){
  //   await this.split();
  // }
};
module.exports = remove;

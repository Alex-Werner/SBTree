async function remove(identifier){
  const parent = this.getParent();
  const adapter = parent.getAdapter();
  await adapter.removeInLeaf(this.id, identifier);
  const isFull = await this.isAtLeastHalfFull();


  // if(isFull){
  //   await this.split();
  // }
};
module.exports = remove;

async function insert(identifier, value){
  const parent = this.getParent();
  const adapter = parent.getAdapter();
  await adapter.addInLeaf(this.name, identifier, value);
  const isFull = await this.isFull();

  if(isFull){
    await this.split();
  }
};
module.exports = insert;

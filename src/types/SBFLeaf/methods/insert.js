async function insert(key, identifier){
  const adapter = this.getParent().getAdapter();
  await adapter.addInLeaf(this.name, identifier, key);
  const isFull = await this.isFull();
  if(isFull){
    await this.split();
  }
};
module.exports = insert;

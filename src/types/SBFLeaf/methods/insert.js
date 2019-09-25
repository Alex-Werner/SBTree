async function insert(key, identifier){
  const parent = this.getParent();
  const adapter = parent.getAdapter();
  await adapter.addInLeaf(this.name, identifier, key);
  const isFull = await this.isFull();


  if(isFull){
    await this.split();
  }
};
module.exports = insert;

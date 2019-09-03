async function insert(key, identifier){
  const adapter = this.getParent().getAdapter();
  const field = this.getParent().getTree().field;
  await adapter.addInLeaf(this.name, field, identifier, key);
  const isFull = await this.isFull();


  if(isFull){
    await this.split();
  }
};
module.exports = insert;

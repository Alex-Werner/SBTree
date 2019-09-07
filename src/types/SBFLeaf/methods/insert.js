async function insert(key, identifier){
  const parent = this.getParent();
  const adapter = parent.getAdapter();
  const field = parent.getTree().field;
  await adapter.addInLeaf(this.name, field, identifier, key);
  const isFull = await this.isFull();


  if(isFull){
    await this.split();
  }
};
module.exports = insert;

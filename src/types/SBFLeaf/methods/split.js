async function split(){
  const adapter = this.getParent().getAdapter();

  const newLeaf = new this.constructor({parent:this.getParent()});
  await adapter.createLeaf(newLeaf.name);
  const midKey = await adapter.splitLeaf(this, newLeaf);

  const index = await this.getParent().insertReferenceKey(midKey);
  await this.getParent().attachLeaf(index+1,newLeaf);
};
module.exports = split;

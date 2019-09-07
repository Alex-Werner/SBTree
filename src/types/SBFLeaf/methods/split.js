async function split(){
  const parent = this.getParent();
  const adapter = parent.getAdapter();

  const newLeaf = new this.constructor({parent});
  await adapter.createLeaf(newLeaf.name);
  const midKey = await adapter.splitLeaf(this, newLeaf);

  const index = await parent.insertReferenceKey(midKey);
  await parent.attachLeaf(index+1,newLeaf);
};
module.exports = split;

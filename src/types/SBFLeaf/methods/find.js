module.exports = async function find(key){
  const adapter = this.getParent().getAdapter();
  const res = await adapter.findInLeaf(this.name,key);
  return res
}

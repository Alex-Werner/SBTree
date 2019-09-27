module.exports = async function find(value){
  const adapter = this.getParent().getAdapter();
  const res = await adapter.findInLeaf(this.name,value);
  return res
}

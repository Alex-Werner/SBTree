module.exports = async function findAll(){
  const adapter = this.getParent().getAdapter();
  const res = await adapter.getAllInLeaf(this.id);
  return res
}

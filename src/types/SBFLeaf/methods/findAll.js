module.exports = async function findAll(){
  const adapter = this.getParent().getAdapter();
  const res = await adapter.findAllInLeaf(this.name);
  return res
}

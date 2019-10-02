module.exports = async function getRight(){
  const adapter = this.getParent().getAdapter();
  const res = await adapter.getRightInLeaf(this.id);
  return res
}

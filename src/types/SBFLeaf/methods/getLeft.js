module.exports = async function getLeft(){
  const adapter = this.getParent().getAdapter();
  const res = await adapter.getLeftInLeaf(this.id);
  return res
}

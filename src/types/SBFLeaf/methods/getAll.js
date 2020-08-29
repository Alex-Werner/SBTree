module.exports = async function getAll() {
  const adapter = this.getParent().getAdapter();
  const res = await adapter.getAllInLeaf(this.id);
  return res;
};

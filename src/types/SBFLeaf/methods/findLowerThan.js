module.exports = async function findLowerThan(value, includeKey= false){
  const op = includeKey ? '$lte' : '$lt';
  const adapter = this.getParent().getAdapter();
  const res = await adapter.findInLeaf(this.id,value, op);
  return res
}

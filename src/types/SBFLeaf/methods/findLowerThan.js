module.exports = async function findLowerThan(key, includeKey= false){
  const op = includeKey ? '$lte' : '$lt';
  const adapter = this.getParent().getAdapter();
  const res = await adapter.findInLeaf(this.name,key, op);
  return res
}

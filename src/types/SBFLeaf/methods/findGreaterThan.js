module.exports = async function findGeaterThan(key, includeKey= false){
  const op = includeKey ? '$gte' : '$gt';
  const adapter = this.getParent().getAdapter();
  const res = await adapter.findInLeaf(this.name,key, op);
  return res
}

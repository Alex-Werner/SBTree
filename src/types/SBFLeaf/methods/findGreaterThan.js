module.exports = async function findGeaterThan(value, includeKey= false){
  const op = includeKey ? '$gte' : '$gt';
  const adapter = this.getParent().getAdapter();
  const res = await adapter.findInLeaf(this.id,value, op);

  return res
}

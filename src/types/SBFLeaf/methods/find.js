module.exports = async function find(key){
  const adapter = this.getParent().getAdapter();
  return adapter.findInLeaf(this.name,key);
}

async function isAtLeastHalfFull(){
  const parent = this.getParent();
  const adapter = parent.getAdapter();
  const order = parent.getTreeOptions().order;
  try {
    const leaf = await adapter.openLeaf(this.id);
    const half = ~~order/2;
    return leaf.meta.size>=half;

  }catch (e) {
    if(e.message === 'Leaf do not exist'){
      await adapter.createLeaf(this.id);
      return this.isAtLeastHalfFull()
    }
    else throw e
  };
};
module.exports = isAtLeastHalfFull;

async function isFillFactorFilled(){
  const parent = this.getParent();
  const adapter = parent.getAdapter();
  const {fillFactor,order} = parent.getTreeOptions().order;
  try {
    const leaf = await adapter.openLeaf(this.id);
    return leaf.meta.size>=(order*fillFactor);

  }catch (e) {
    if(e.message === 'Leaf do not exist'){
      await adapter.createLeaf(this.id);
      return this.isFillFactorFilled()
    }
    else throw e
  };
};
module.exports = isFillFactorFilled;

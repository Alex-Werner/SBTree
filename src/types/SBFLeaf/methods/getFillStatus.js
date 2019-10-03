async function getFillStatus(){
  const parent = this.getParent();
  const adapter = parent.getAdapter();
  const {fillFactor,order} = parent.getTreeOptions();
  if(fillFactor<0.5){
    throw new Error(`FillFactor cannot be less than 0.5. Received ${fillFactor}`)
  }
  try {
    const leaf = await adapter.openLeaf(this.id);

    return {fillFactor, order, leafSize:leaf.meta.size, fillFactorFilled: leaf.meta.size>=(order*fillFactor)};
  }catch (e) {
    if(e.message === 'Leaf do not exist'){
      await adapter.createLeaf(this.id);
      return this.getFillStatus()
    }
    else throw e
  };
};
module.exports = getFillStatus;
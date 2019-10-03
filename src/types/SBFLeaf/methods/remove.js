async function remove(identifier){
  const parent = this.getParent();
  const adapter = parent.getAdapter();
  await adapter.removeInLeaf(this.id, identifier);
  const fillFactorFilled = await this.isFillFactorFilled();
  if(fillFactorFilled){
    return true;
  }else{
    try{
      await this.redistribute();
    }catch (e) {
      await this.mergeWithSiblings();
    }
  }
};
module.exports = remove;

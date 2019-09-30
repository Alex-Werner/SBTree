async function remove(identifier){
  const parent = this.getParent();
  const adapter = parent.getAdapter();
  await adapter.removeInLeaf(this.id, identifier);
  const fillFactorFilled = await this.isFillFactorFilled();
  if(fillFactorFilled){
    return true;
  }else{
    try{
      this.redistribute();
    }catch (e) {
      this.mergeWithSiblings();
    }
  }
};
module.exports = remove;

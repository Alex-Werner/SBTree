async function remove(remCmd){
  const parent = this.getParent();
  const adapter = parent.getAdapter();

  // const value = remCmd.query[this.fieldName];
  const identifier = remCmd._id;
  const selfPos = parent.childrens.findIndex((el)=> el.id === this.id);


  const removed = await adapter.removeInLeaf(this.id, identifier);
  if(removed.length===0){
    return false;
  }
  if(removed.length>1) throw new Error(`Unexpected amount of removed entities in same leaf`);

  if(removed[0].index===0){
    const newLeft = await adapter.getLeftInLeaf(this.id);

    if(newLeft.key){
      parent.keys.splice(selfPos-1, 1, newLeft.key)
    }else{
      parent.keys.splice(selfPos-1, 1)
    }
  }

  const fillFactorFilled = await this.isFillFactorFilled();
  if(fillFactorFilled){
    return true;
  }else{
    try{
      await this.redistribute();
    }catch (e) {
      try{
        await this.mergeWithSiblings();
      }catch (e) {
        // This is done to be valid with https://www.cs.csubak.edu/~msarr/visualizations/BPlusTree.html
        // but BPlusTree.js line 1289 has a discrepenties (comment says inverse of code).
        // So FIXME with real research on what is advised perf-wise TODO
        return true;
      }
    }
  }
};
module.exports = remove;

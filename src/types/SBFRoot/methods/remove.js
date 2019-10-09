async function remove(remCmd){
  const value = remCmd.query[this.fieldName];

  let leafIndex = 0;
  this.keys.forEach((_key)=>{
    if(value<_key) return;
    leafIndex++;
  });

  const leaf = this.childrens[leafIndex];
  if(leaf){
    await leaf.remove(remCmd);

    // This has been added for the case where previous also contains the same value
    if(this.childrens[leafIndex-1]){
      await this.childrens[leafIndex-1].remove(remCmd);
    }
  }
};
module.exports = remove;

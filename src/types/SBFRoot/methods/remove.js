async function remove(remCmd){
  const value = remCmd.query[this.fieldName];
  const {identifiers, keys, childrens} = this;
  let leafIndex = 0;
  keys.forEach((_key)=>{
    if(value<_key) return;
    leafIndex++;
  });

  if(!childrens.length){
    const item = this.keys[leafIndex-1]
    if(item){
      keys.splice(leafIndex-1,1)
      identifiers.splice(leafIndex-1,1)
    }
  }
  const leaf = childrens[leafIndex];
  if(leaf){
    await leaf.remove(remCmd);

    // This has been added for the case where previous also contains the same value
    if(childrens[leafIndex-1]){
      await childrens[leafIndex-1].remove(remCmd);
    }
  }
};
module.exports = remove;

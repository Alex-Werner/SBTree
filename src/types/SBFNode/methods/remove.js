async function remove(remCmd){
  const value = remCmd.query[this.fieldName];

  let leafIndex = 0;
  this.keys.forEach((_key)=>{
    if(value<_key) return;
    leafIndex++;
  });

  const leaf = this.childrens[leafIndex];
  await leaf.remove(remCmd);
};
module.exports = remove;


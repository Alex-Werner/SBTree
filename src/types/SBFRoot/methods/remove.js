
async function remove(value){
  let leafIndex = 0;
  this.keys.forEach((_key)=>{
    if(value<=_key) return;
    leafIndex++;
  });

  const leaf = this.childrens[leafIndex];
  await leaf.remove(value);
};
module.exports = remove;


async function remove(key){
  let leafIndex = 0;
  this.keys.forEach((_key)=>{
    if(key<=_key) return;
    leafIndex++;
  });

  const leaf = this.childrens[leafIndex];

  // Attention,
  throw new Error('Not implemented')
  await leaf.remove(key);
};
module.exports = remove;

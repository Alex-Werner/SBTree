module.exports = async function find(key){
  let leafIndex = 0;
  this.keys.forEach((_key)=>{
    if(key<=_key) return;
    leafIndex++;
  });
  const leaf = this.childrens[leafIndex];
  return leaf.find(key);
}

module.exports = async function insert(key, identifier){
  if(!this.childrens.length){
    throw new Error(`SBFNode cannot insert with no childrens`);
  }
  let leafIndex = 0;
  this.keys.forEach((_key)=>{
    if(key<=_key) return;
    leafIndex++;
  });
  const leaf = this.childrens[leafIndex];
  await leaf.insert(key, identifier);

  if(this.isFull()){
    await this.split();
  }
}

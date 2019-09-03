async function find(key){
  let leafIndex = 0;
  this.keys.forEach((_key)=>{
    if(key<=_key) return;
    leafIndex++;
  });

  const leaf = this.childrens[leafIndex];
  let result = await leaf.find(key);

  if(leafIndex>0){
    const left = this.childrens[leafIndex];
    result = result.concat(result, await left.find(key));
  }
  // We also check the leaf nearby
  if(this.childrens.length>leafIndex+1){
    const right = this.childrens[leafIndex+1];
    result = result.concat(result, await right.find(key));
  }
  return result;
}
module.exports = find;

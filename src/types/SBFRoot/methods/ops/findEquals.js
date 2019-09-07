module.exports = async function findEquals(key){
  let leafIndex = 0;
  this.keys.forEach((_key)=>{
    if(key<=_key) return;
    leafIndex++;
  });

  let result = [];


  const left = this.childrens[leafIndex];
  if(left){
  result = result.concat(await left.find(key));
  }

  // We also check the leaf nearby
  if(this.childrens.length>leafIndex+1){
    const right = this.childrens[leafIndex+1];
    result = result.concat(await right.find(key));
  }
  return result;
};

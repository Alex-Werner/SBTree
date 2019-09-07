module.exports = async function findEquals(key){
  let leafIndex = 0;
  this.keys.forEach((_key)=>{
    if(key<=_key) return;
    leafIndex++;
  });

  let result = [];
  let p = []

  const {childrens} = this;
  const left = childrens[leafIndex];
  if(left){
    p.push(left.find(key));
  }

  // We also check the leaf nearby
  if(childrens.length>leafIndex+1){
    const right = childrens[leafIndex+1];
    p.push(right.find(key));
  }

  await Promise.all(p).then((res)=>{
    res.forEach((_pRes)=>{

      result = result.concat(_pRes);
    })
  });
  return result;
};

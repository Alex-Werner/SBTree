module.exports = async function findEquals(value){
  let result = {identifiers:[], keys:[]};
  const {childrens, identifiers, keys} = this;

  let leafIndex = 0;
  keys.forEach((_key)=>{
    if(value<=_key) return;
    leafIndex++;
  });

  let p = []

  if(childrens.length===0){
    if(identifiers[leafIndex]){
      result.identifiers.push(identifiers[leafIndex])
      result.keys.push(keys[leafIndex])
    }
  }else{
    const left = childrens[leafIndex];
    if(left){
      p.push(left.find(value));
    }
    // We also check the leaf nearby
    if(childrens.length>leafIndex+1){
      const right = childrens[leafIndex+1];
      p.push(right.find(value));
    }
    await Promise.all(p).then((res)=>{
      if(res.length>0){
        res.forEach((_pRes)=>{
          if(_pRes.identifiers){
            result.identifiers.push(..._pRes.identifiers);
            result.keys.push(..._pRes.keys);
          }
        })
      }
    });
  }
  return result;

};

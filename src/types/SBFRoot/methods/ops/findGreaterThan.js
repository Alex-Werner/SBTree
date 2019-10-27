async function findGreaterThan(key, includeKey=false){
  let result = {identifiers:[], keys:[]};
  const {childrens, identifiers, keys} = this;
  // We first see where our key is located;
  let leafIndex = 0;

  keys.forEach((_key)=>{
    if(key<=_key) return;
    leafIndex++;
  });


  let p = [];

  if(childrens.length===0){

    if(identifiers[leafIndex]){
      keys.slice(leafIndex).forEach((_key, i)=>{
        if(_key>=key){
          if(_key === key && !includeKey){
            return;
          }
          result.identifiers.push(identifiers[leafIndex+i])
          result.keys.push(_key)
        }
      })
    }
  }else{

    // first, we lookup for all greater than matches in the actual leaf where we had our el.
    p.push(childrens[leafIndex].findGreaterThan(key, includeKey));

    // If our key is in the keys, then right item will contains our key and it's superior elements
    // We need this extra step first
    let start = leafIndex+1;
    if(keys.includes(key)){
      p.push(childrens[start].findGreaterThan(key, includeKey));
      start+=1;
    }

    // All bigger leaf that our leafIndex needs to be included
    if(leafIndex<childrens.length-1){
      childrens.slice(start).forEach((child, i)=>{
        p.push(child.getAll());
      });
    }

    await Promise.all(p).then((res)=>{
      res.forEach((p)=>{
        result.identifiers.push(...p.identifiers);
        result.keys.push(...p.keys);
      })
    });
  }

  return result;

};
module.exports = findGreaterThan;

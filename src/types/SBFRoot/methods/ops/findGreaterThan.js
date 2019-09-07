async function findGreaterThan(key, includeKey=false){
  let result = [];

  // We first see where our key is located;
  let leafIndex = 0;

  this.keys.forEach((_key)=>{
    if(key<=_key) return;
    leafIndex++;
  });


  let p = [];

  // first, we lookup for all greater than matches in the actual leaf where we had our el.
  p.push(this.childrens[leafIndex].findGreaterThan(key, includeKey));
  // If our key is in the keys, then right item will contains our key and it's superior elements
  // We need this extra step first
  let start = leafIndex+1;
  if(this.keys.includes(key)){

    p.push(this.childrens[start].findGreaterThan(key, includeKey));
    start+=1;
  }
  // All bigger leaf that our leafIndex needs to be included
  if(leafIndex<this.childrens.length-1){
    this.childrens.slice(start).forEach((child, i)=>{
      p.push(child.findAll());
    });
  }

  await Promise.all(p).then((res)=>{
    res.forEach((p)=>{
      result = result.concat(p);
    })
  });
  return result;
};
module.exports = findGreaterThan;

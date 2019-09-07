async function findGreaterThan(key,includeKey=false) {
  let result = [];

  let leafIndex = 0;
  let p = [];
  // It might be a bug that we have no keys, but in this case, we take first child
  if(this.keys.length===0 && this.childrens.length===1){
    p.push(this.childrens[0].findLowerThan(key, includeKey));
  }else{
    // Let's find our first match leaf
    this.keys.forEach((_key) => {
      if (key <= _key) return;
      leafIndex++;
    });

    // We lookup in our children
    p.push(this.childrens[leafIndex].findGreaterThan(key, includeKey));

    // And all greater value
    this.childrens.slice(leafIndex+1).forEach((child) => {
      p.push(child.findAll())
    });


  }
  await Promise.all(p).then((res) => {
    res.forEach((_el) => {
      result = result.concat(_el);
    })
  });
  return result;
}
module.exports = findGreaterThan

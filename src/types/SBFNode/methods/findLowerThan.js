async function findLowerThan(value,includeKey=false) {
  let result = [];

  let leafIndex = 0;
  let p = [];
  // It might be a bug that we have no keys, but in this case, we take first child
  if(this.keys.length===0 && this.childrens.length===1){
    p.push(this.childrens[0].findLowerThan(value, includeKey));
  }else{
    // Let's find our first match leaf
    this.keys.forEach((_key) => {
      if (value <= _key) return;
      leafIndex++;
    });

    // We first look up all smaller value
    this.childrens.slice(0,leafIndex).forEach((child) => {
      p.push(child.findAll())
    });

    // And then we lookup in our children
    p.push(this.childrens[leafIndex].findLowerThan(value, includeKey));

    // And the next one if it exist (in case we got duplicate same value
    if(this.childrens[leafIndex+1]){
      p.push(this.childrens[leafIndex+1].findLowerThan(value, includeKey));
    }
  }
  await Promise.all(p).then((res) => {
    res.forEach((p) => {
      result = result.concat(p);
    })
  });
  return result;
}
module.exports = findLowerThan

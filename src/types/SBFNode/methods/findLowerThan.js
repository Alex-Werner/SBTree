async function findLowerThan(key,includeKey=false) {
  let result = [];

  let leafIndex = 0;
  let p = [];
  if(this.keys.length===0 && this.childrens.length===1){
    p.push(this.childrens[0].findLowerThan(key, includeKey));
  }else{
    this.keys.forEach((_key) => {
      if (key <= _key) return;
      leafIndex++;
      p.push(this.childrens[leafIndex].findLowerThan(key, includeKey));
    });
  }
  await Promise.all(p).then((res) => {
    res.forEach((p) => {
      result = result.concat(p);
    })
  });
  return result;
}
module.exports = findLowerThan

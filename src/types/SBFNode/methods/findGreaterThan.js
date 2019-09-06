async function findGreaterThan(key,includeKey=false) {
  let result = [];

  let leafIndex = 0;
  this.keys.forEach((_key) => {
    if (key <= _key) return;
    leafIndex++;
  });

  result = result.concat(this.childrens.leafs[leafIndex].findGreaterThan(key, includeKey));
  let p = [];
  this.childrens.leafs.slice(leafIndex).forEach((child) => {
    p.push(child.findAll())
  });
  await Promise.all(p).then((res) => {
    res.forEach((p) => {
      result = result.concat(p);
    })
  });
  return result;
}
module.exports = findGreaterThan

module.exports = async

function findLowerThan(key,includeKey=false) {
  let result = [];

  let leafIndex = 0;
  let p = [];
  this.keys.forEach((_key) => {
    if (key <= _key) return;
    leafIndex++;
    p.push(this.childrens.findLowerThan(key, includeKey));
  });

  await Promise.all(p).then((res) => {
    res.forEach((p) => {
      result = result.concat(p);
    })
  });
  return result;
}

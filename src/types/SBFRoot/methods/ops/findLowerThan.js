async function findLowerThan(key, includeKey = false) {
  let result = {identifiers: [], keys: []};
  const {childrens,identifiers, keys} = this;

  // We first see where our key is located;
  let leafIndex = 0;

  keys.forEach((_key) => {
    if (key <= _key) return;
    leafIndex++;
  });

  let p = [];

  if(childrens.length===0){
    if(identifiers[leafIndex]){
      keys.forEach((_key)=>{
        if(_key<key){
          result.identifiers.push(identifiers[leafIndex])
          result.keys.push(keys[leafIndex])
        }
      })
    }
  }else{
    // All smaller leaf that our leafIndex needs to be included
    if (leafIndex >= 1) {
      childrens.slice(0, leafIndex).forEach((child) => {
        p.push(child.getAll());
      });
    }

    // Finally, we lookup for all lower than matches in the actual leaf where we had our el.
    p.push(childrens[leafIndex].findLowerThan(key, includeKey));

    if (keys.includes(key)) {
      p.push(await childrens[leafIndex + 1].findLowerThan(key, includeKey));
    }

    await Promise.all(p).then((res) => {
      res.forEach((p) => {
        result.identifiers.push(...p.identifiers);
        result.keys.push(...p.keys);
      })
    });

    return result;
  }

};
module.exports = findLowerThan;

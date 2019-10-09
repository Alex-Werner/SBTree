async function findGreaterThan(value, includeKey = false) {
  let result = [];
  const {childrens, keys} = this;

  let leafIndex = 0;
  let p = [];
  // It might be a bug that we have no keys, but in this case, we take first child
  if (keys.length === 0 && childrens.length === 1) {
    p.push(childrens[0].findLowerThan(value, includeKey));
  } else {
    // Let's find our first match leaf
    keys.forEach((_key) => {
      if (value <= _key) return;
      leafIndex++;
    });

    // We lookup in our children
    p.push(childrens[leafIndex].findGreaterThan(value, includeKey));

    // And all greater value
    childrens.slice(leafIndex + 1).forEach((child) => {
      p.push(child.findAll())
    });


  }
  await Promise.all(p).then((res) => {
    res.forEach((_el) => {
      result.identifiers.push(...p.identifiers);
      result.keys.push(...p.keys);
      // result = result.concat(_el);
    })
  });
  return result;
}

module.exports = findGreaterThan

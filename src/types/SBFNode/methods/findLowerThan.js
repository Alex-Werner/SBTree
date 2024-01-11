async function findLowerThan(value, includeKey = false) {
  const result = { identifiers: [], keys: [] };
  const { childrens, keys } = this;
  let leafIndex = 0;
  const p = [];
  // It might be a bug that we have no keys, but in this case, we take first child
  if (keys.length === 0 && childrens.length === 1) {
    p.push(childrens[0].findLowerThan(value, includeKey));
  } else {
    // Let's find our first match leaf
    keys.forEach((_key) => {
      if (value <= _key) return;
      leafIndex++;
    });

    // We first look up all smaller value
    childrens.slice(0, leafIndex).forEach((child) => {
      p.push(child.getAll());
    });

    // And then we lookup in our children
    p.push(childrens[leafIndex].findLowerThan(value, includeKey));

    // And the next one if it exist (in case we got duplicate same value
    if (childrens[leafIndex + 1]) {
      p.push(childrens[leafIndex + 1].findLowerThan(value, includeKey));
    }
  }
  await Promise.all(p).then((res) => {
    res.forEach((p) => {
      result.identifiers.push(...p.identifiers);
      result.keys.push(...p.keys);
    });
  });
  return result;
}

export default findLowerThan;

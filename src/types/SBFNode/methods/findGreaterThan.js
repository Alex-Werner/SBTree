async function findGreaterThan(value, includeKey = false) {
  const result = { identifiers: [], keys: [] };
  const { childrens, identifiers, keys } = this;

  let leafIndex = 0;
  const p = [];

  if (childrens.length === 0) {
    if (identifiers[leafIndex]) {
      keys.slice(leafIndex).forEach((_key, i) => {
        if (_key >= key) {
          if (_key === key && !includeKey) {
            return;
          }
          result.identifiers.push(identifiers[leafIndex + i]);
          result.keys.push(_key);
        }
      });
    }
  } else {
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
        p.push(child.getAll());
      });
    }
    await Promise.all(p).then((res) => {
      res.forEach((_el) => {
        result.identifiers.push(..._el.identifiers);
        result.keys.push(..._el.keys);
      });
    });
  }

  return result;
}

module.exports = findGreaterThan;

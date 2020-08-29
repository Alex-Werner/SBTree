module.exports = async function findEquals(value) {
  const result = { identifiers: [], keys: [] };
  const { childrens, identifiers, keys } = this;

  let leafIndex = 0;
  keys.forEach((_key) => {
    if (value <= _key) return;
    leafIndex++;
  });

  const p = [];

  if (childrens.length === 0) {
    if (identifiers[leafIndex]) {
      keys.slice(leafIndex).forEach((_key, i) => {
        if (_key === value) {
          result.identifiers.push(identifiers[leafIndex + i]);
          result.keys.push(_key);
        }
      });
    }
  } else {
    const left = childrens[leafIndex];
    if (left) {
      p.push(left.find(value));
    }
    // We also check the leaf nearby
    if (childrens.length > leafIndex + 1) {
      const right = childrens[leafIndex + 1];
      p.push(right.find(value));
    }
    await Promise.all(p).then((res) => {
      if (res.length > 0) {
        res.forEach((_pRes) => {
          if (_pRes.identifiers) {
            result.identifiers.push(..._pRes.identifiers);
            result.keys.push(..._pRes.keys);
          }
        });
      }
    });
  }
  return result;
};

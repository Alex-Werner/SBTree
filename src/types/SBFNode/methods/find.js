module.exports = async function find(value) {
  const results = { identifiers: [], keys: [] };
  const { childrens } = this;
  let leafIndex = 0;
  this.keys.forEach((_key) => {
    if (value <= _key) return;
    leafIndex++;
  });
  const leaf = childrens[leafIndex];

  // const leaf = this.childrens[leafIndex];
  const leftRes = await leaf.find(value);

  results.identifiers.push(...leftRes.identifiers);
  results.keys.push(...leftRes.keys);
  //
  // if(leafIndex>0){
  //   console.log('oui', leafIndex)
  //   const left = this.childrens[leafIndex];
  //   result = result.concat(await left.find(key));
  // }
  // We also check the leaf nearby
  if (childrens.length > leafIndex + 1) {
    const right = childrens[leafIndex + 1];
    const rightRes = await right.find(value);
    results.identifiers.push(...rightRes.identifiers);
    results.keys.push(...rightRes.keys);
    // result = result.concat(await right.find(value));
  }

  return results;
  //
  return leaf.find(value);
};

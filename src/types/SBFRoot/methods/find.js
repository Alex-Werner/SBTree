async function findEquals(key){
  let leafIndex = 0;
  this.keys.forEach((_key)=>{
    if(key<=_key) return;
    leafIndex++;
  });

  let result = [];


  const left = this.childrens[leafIndex];
  result = result.concat(await left.find(key));

  // We also check the leaf nearby
  if(this.childrens.length>leafIndex+1){
    const right = this.childrens[leafIndex+1];
    result = result.concat(await right.find(key));
  }
  return result;
}
async function find(key, operator = '$eq'){
  switch (operator) {
    case '$eq':
      return findEquals.call(this,key);
      break;
    case '$neq':
      const findAllIdentifier = await this.findAll();
      const excludedIdentifiers = await findEquals.call(this, key);
      return findAllIdentifier.filter(id => !excludedIdentifiers.includes(id));
    default:
      throw new Error(`Not handled operator ${operator}`)
  }
}
module.exports = find;

const SBFLeaf = require('../../SBFLeaf/SBFLeaf');
module.exports = async function insert(identifier,value){
  const {childrens, keys} = this;
  if(!childrens.length){
    const leaf = new SBFLeaf({parent: this});
    await leaf.insert(identifier, value);
    childrens.push(leaf);
    // this.keys.push(value);
    // throw new Error(`SBFNode cannot insert with no childrens`);
  }
  let leafIndex = 0;
  keys.forEach((_key)=>{
    if(value<=_key) return;
    leafIndex++;
  });
  const leaf = childrens[leafIndex];
  await leaf.insert(identifier, value);

  if(this.isFull()){
    await this.split();
  }
}

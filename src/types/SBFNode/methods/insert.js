const SBFLeaf = require('../../SBFLeaf/SBFLeaf');
module.exports = async function insert(identifier,value){
  if(!this.childrens.length){
    const leaf = new SBFLeaf({parent: this});
    await leaf.insert(identifier, value);
    this.childrens.push(leaf);
    // this.keys.push(value);
    // throw new Error(`SBFNode cannot insert with no childrens`);
  }
  let leafIndex = 0;
  this.keys.forEach((_key)=>{
    if(value<=_key) return;
    leafIndex++;
  });
  const leaf = this.childrens[leafIndex];
  await leaf.insert(identifier, value);

  if(this.isFull()){
    await this.split();
  }
}

const SBFLeaf = require('../../SBFLeaf/SBFLeaf');

async function insert(identifier, value = null){
  console.log('SBFROOT insert', value)
  if(this.childrens.length===0){
    // if(this.keys.length===0){
      const idx = await this.insertReferenceKey(value)
      this.identifiers.splice(idx, 0, identifier);
    // }else{
      // const leaf = new SBFLeaf({parent:this});
      // this.childrens.push(leaf);

      // await leaf.insert(identifier, value);
    // }
  }else{
    let leafIndex = 0;
    this.keys.forEach((_key)=>{
      if(value<=_key) return;
      leafIndex++;
    });
    const leaf = this.childrens[leafIndex];
    await leaf.insert(identifier, value);
  }

  if(this.isFull()){
    await this.split();
  }


};
module.exports = insert;

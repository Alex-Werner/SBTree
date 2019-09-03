const SBFLeaf = require('../../SBFLeaf/SBFLeaf');

async function insert(key, identifier = null){

  if(!this.childrens.length){
    const leaf = new SBFLeaf({parent:this});
    this.childrens.push(leaf);

    await leaf.insert(key, identifier);

  }else{
    let leafIndex = 0;
    this.keys.forEach((_key)=>{
      if(key<=_key) return;
      leafIndex++;
    });
    const leaf = this.childrens[leafIndex];
    await leaf.insert(key, identifier);
  }

  if(this.isFull()){
    await this.split();
  }

};
module.exports = insert;

const SBFNode = require('../../SBFNode/SBFNode');

async function split(){
  const midIndex = ~~(this.keys.length/2);
  const rightKeys = this.keys.splice(midIndex);
  const leftKeys = this.keys.splice(0);

  const midKey = rightKeys.splice(0,1)[0];


  const rightChildrens = this.childrens.splice(midIndex+1);
  const leftChildrens = this.childrens.splice(0);


  const right = new SBFNode({parent:this});
  right.keys = rightKeys;
  right.childrens = rightChildrens;
  rightChildrens.forEach((child)=>{
    child.setParent(right);
  })


  const left = new SBFNode({parent:this});
  left.keys = leftKeys;
  left.childrens = leftChildrens;
  leftChildrens.forEach((child)=>{
    child.setParent(left);
  })

  this.keys.push(midKey);
  this.childrens = [left, right];
};
module.exports = split;

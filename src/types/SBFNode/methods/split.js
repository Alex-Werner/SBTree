module.exports = async function split(){
  // console.log('Node - split')

  const midIndex = ~~(this.keys.length/2);

  const rightKeys = this.keys.splice(midIndex);
  const leftKeys = this.keys.splice(0);

  const midKey = rightKeys.splice(0,1)[0];

  const rightChildrens = this.childrens.splice(midIndex+1);
  const leftChildrens = this.childrens.splice(0);

  const parent = this.getParent();

  const right = new this.constructor({parent});
  right.keys = rightKeys;
  right.childrens = rightChildrens;
  rightChildrens.forEach((child)=>{
    child.setParent(right);
  })

  const left = new this.constructor({parent});
  left.keys = leftKeys;
  left.childrens = leftChildrens;
  leftChildrens.forEach((child)=>{
    child.setParent(left);
  })

  const currentChildIndex = parent.childrens.indexOf(this);
  // Remove current referent
  parent.childrens.splice(currentChildIndex,1);
  await parent.attachLeaf(currentChildIndex,left);
  await parent.attachLeaf(currentChildIndex+1,right);
  await parent.insertReferenceKey(midKey);
}

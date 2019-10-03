async function mergeWithSiblings(){
  const parent = this.getParent();
  const adapter = parent.getAdapter();

  const selfId = this.id;
  const selfPos = parent.childrens.findIndex((el)=> el.id === selfId);
  let hasMerged = false;

  const siblings = {};

  if(selfPos>=0) siblings.left = parent.childrens[selfPos-1];
  if(parent.childrens.length>selfPos+1) siblings.right = parent.childrens[selfPos+1];


  if(siblings.left) siblings.leftStatus = await siblings.left.getFillStatus();
  if(siblings.right) siblings.rightStatus = await siblings.left.getFillStatus();

  if(selfPos===0 && siblings.right){
    const rightSib = siblings.right;

    throw new Error('Implementation required.');

    // Repair for parent.

  }else if(siblings.left){
    const leftSib = siblings.left;
    const leftSibPos = selfPos-1;
    const {identifiers, keys} = await leftSib.getAll();

    const p = [];
    identifiers.forEach((identifier,i)=>{
      const key = keys[i];
      p.push(this.insert(identifier, key));
    });
    await Promise.all(p);

    // Kill parent's children
    delete parent.childrens[leftSibPos];

    // Remove the undefined corpse from the array
    parent.childrens.splice(leftSibPos,1);

    // Repair parent keys
    hasMerged=true;
  }



  if(!hasMerged){
    throw new Error('Failed to merge with siblings');
  }
  return hasMerged;
};
module.exports = mergeWithSiblings;

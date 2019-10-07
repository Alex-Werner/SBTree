/**
 * Merge the node with it's parent (thus : up).
 * Used mostly from the results of a merge from leafs when it result in emptying parent node keys.
 * Parent node is then called for some mergeUp.
 *
 * @returns {Promise<void>}
 */
const mergeUp = async function(){
  console.log('Node - Merge up')
  const parent = this.getParent();
  const {childrens, keys, id}= this;
  // const
  const selfPos = parent.childrens.findIndex((el)=> el.id === id);
  if(childrens.length!==1){
    throw new Error('We did not tought about resolving this case. ');//todo
  }

  if(parent.childrens.length===2 && !await parent.getFillStatus().fillFactorFilled){
    let siblingPos = (selfPos===1) ? 0 : 1;
    // Our sibling is the other parent child.
    const sibling = parent.childrens[siblingPos];

    // We bump up keys of our siblings.
    parent.keys.splice(siblingPos, 0, ...sibling.keys);
    parent.childrens = [...sibling.childrens, ...childrens]
  }else{
    // parent.childrens.splice(selfPos, 1, childrens[0]);
    // console.log(selfPos);
    // console.log(parent.keys);
    // console.log(parent)

    // console.log(this)
    // console.log(await parent.getFillStatus())
    throw new Error('Not implemented : MergingUp');
  }


};
module.exports = mergeUp;

/**
 * Try to balance the leaf in order to get itself to reach fillFactor
 * In order to do that, it will try to borrow siblings (sharing similar parent)
 *
 * @returns {Promise<boolean>}
 */
async function redistribute(){
  // console.log('Leaf - redistribute')
  const parent = this.getParent();
  const adapter = parent.getAdapter();

  const selfId = this.id;
  const selfPos = parent.childrens.findIndex((el)=> el.id === selfId);

  let redistributed = 0;

  const siblings = {};

  if(selfPos>=0) siblings.left = parent.childrens[selfPos-1];
  if(parent.childrens.length>selfPos+1) siblings.right = parent.childrens[selfPos+1];


  const borrowFromRight = async ()=>{
    const rightStatus = await siblings.right.getFillStatus();
    if(rightStatus.fillFactorFilled && (rightStatus.leafSize>Number.parseInt(rightStatus.order/2))){
      redistributed+=1;
      throw new Error('Missing implementation of actually redistribute');
    }else return false;
  }
  const borrowFromLeft = async ()=>{
    const leftStatus = await siblings.left.getFillStatus();

    if(leftStatus.fillFactorFilled && (leftStatus.leafSize>Number.parseInt(leftStatus.order/2))){
      redistributed+=1;
      throw new Error('Missing implementation of actually redistribute');
    }else {
      return false;
    }
  }

  // We try as much as we can to borrow left first
  if(!siblings.left){
    try{
      await borrowFromLeft()
    }catch (e) {
      await borrowFromRight()
    }
  }else{
    await borrowFromLeft();
  }

  const hasRedistributed = !!redistributed;
  if(!hasRedistributed){
    throw new Error('Failed to redistribute');
  }
  return hasRedistributed;
};
module.exports = redistribute;

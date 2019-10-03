const getFillStatus = async function(){
  const adapter = this.getAdapter();
  const {fillFactor,order} = this.getTreeOptions();
  if(fillFactor<0.5){
    throw new Error(`FillFactor cannot be less than 0.5. Received ${fillFactor}`)
  }
  return {fillFactor, order, leafSize:this.keys.length, fillFactorFilled: this.keys.length>=(order*fillFactor)};

};
module.exports = getFillStatus;

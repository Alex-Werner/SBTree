const getFillStatus = async function(){
  const adapter = this.getAdapter();
  const {fillFactor,order} = this.getTreeOptions();
  if(fillFactor<0.5){
    throw new Error(`FillFactor cannot be less than 0.5. Received ${fillFactor}`)
  }
  const maxKeys = order - 1;
  const minKeys = Math.floor(maxKeys * fillFactor);

  return {fillFactor, order, leafSize:this.keys.length, fillFactorFilled: this.keys.length>=minKeys};

};
module.exports = getFillStatus;

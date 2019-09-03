const {each}=require('lodash');
function loadState(state){

  this.options = state.options;
  this.size = state.size;

  each(state.fieldTrees,(fieldRoot, field)=>{
    this.setFieldTree(field, fieldRoot);
  })

  return true;
};
module.exports = loadState;

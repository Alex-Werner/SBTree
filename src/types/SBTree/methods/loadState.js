const {each}=require('lodash');
function loadState(state){

  this.options = state.options;
  this.size = state.size;

  each(state.fieldTrees,(fieldRoot, _fieldName)=>{
    this.setFieldTree({fieldName:_fieldName, root:fieldRoot});
  })

  return true;
};
module.exports = loadState;

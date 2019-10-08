const {each}=require('lodash');
function loadState(state){

  this.order = state.order;
  this.fillFactor = state.fillFactor;
  this.verbose = state.verbose;

  this.id = state.id;

  this.size = state.size;

  this.uniques = state.uniques;
  this.exclude = state.exclude;

  each(state.fieldTrees,(fieldRoot, _fieldName)=>{
    this.setFieldTree({fieldName:_fieldName, root:fieldRoot});
  })
  return true;
};
module.exports = loadState;

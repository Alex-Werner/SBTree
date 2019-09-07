const {each}=require('lodash');
function toJSON(){
  const {size, options, uniques, exclude}=this;
  const fieldTrees = {};
  each(this.fieldTrees,(fieldTree, name)=>{
    fieldTrees[name] = fieldTree.root
  })

  return JSON.parse(JSON.stringify({size, options, fieldTrees, uniques, exclude}));
};
module.exports = toJSON;

const {each}=require('lodash');
function toJSON(){
  const {size, options}=this;
  const fieldTrees = {};
  each(this.fieldTrees,(fieldTree, name)=>{
    fieldTrees[name] = fieldTree.root
  })

  return JSON.parse(JSON.stringify({size, options, fieldTrees}));
};
module.exports = toJSON;

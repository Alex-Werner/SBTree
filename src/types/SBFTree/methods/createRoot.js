const SBFRoot = require('../../SBFRoot/SBFRoot');
const SBFLeaf = require('../../SBFLeaf/SBFLeaf');
const SBFNode = require('../../SBFNode/SBFNode');
module.exports = function createRoot(root = null){
  if(this.root){
    throw new Error("Already existing root.");
  }
  let keys = (root && root.keys) ? root.keys : null;
  this.root = new SBFRoot({tree:this, keys});

  if(root){
    root.childrens.forEach((child)=>{
      if(child.type==='leaf'){
        this.root.childrens.push(new SBFLeaf({parent:this.root,...child}))
      }
      if(child.type==='node'){
        this.root.childrens.push(new SBFNode({parent:this.root,...child}))
      }
    })
  }
};

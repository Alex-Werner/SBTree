
import SBFRoot from '../../SBFRoot/SBFRoot.js';
export default function createRoot(root = null) {
  if (this.root) {
    throw new Error('Already existing root.');
  }
  if (root) {
    const _root = (root.root) ? root.root : root;
    _root.tree = this;
    this.root = new SBFRoot(_root);
  } else {
    const { fieldName } = this;
    const keys = (root && root.keys) ? root.keys : null;
    this.root = new SBFRoot({ tree: this, keys, fieldName });
  }

  // Below might have been stopped due to circular dependencies.
  // Let it here until figuring out if needed and therefore fix, or remains of prior state.
  // // const SBFLeaf = require('../../SBFLeaf/SBFLeaf');
  // // const SBFNode = require('../../SBFNode/SBFNode');
  // const {fieldName} = this;
  // let keys = (root && root.keys) ? root.keys : null;
  // this.root = new SBFRoot({tree:this, keys,fieldName});
  //
  // if(root){
  //   root.root.childrens.forEach((child)=>{
  //     if(child.type==='leaf'){
  //       this.root.childrens.push(new SBFLeaf({fieldName,parent:this.root,...child}))
  //     }
  //     if(child.type==='node'){
  //       this.root.childrens.push(new SBFNode({fieldName,parent:this.root,...child}))
  //     }
  //   })
  // }
};

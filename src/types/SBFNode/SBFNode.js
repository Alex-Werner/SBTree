const {insertSorted} = require('../../utils/array');
const SBFLeaf = require('../SBFLeaf/SBFLeaf');
/**
 * SBFTree
 *
 */
class SBFNode {
  #parent
  constructor(props){
    if(!props.parent){
      throw new Error(`SBFNode initialized without parent reference`)
    }
    this.#parent = props.parent;
    this.keys = (props.keys) ? props.keys : [];
    this.childrens = [];
    if(props.childrens){
      props.childrens.forEach((child)=>{
        if(child.type==='leaf'){
          this.childrens.push(new SBFLeaf({parent:this.#parent,...child}))
        }
        if(child.type==='node'){
          this.childrens.push(new SBFNode({parent:this.#parent,...child}))
        }
      })

    }
    this.type = 'node';
  }
  getParent(){
    return this.#parent;
  }
  setParent(parent){
    this.#parent = parent
  }
  getTree(){
    return (this.#parent.getTree());
  }

  getTree(){
    return this.#parent.getTree() || this.#parent.getParent().getTree();
  }

};
SBFNode.prototype.attachLeaf = require('./methods/attachLeaf')
SBFNode.prototype.find = require('./methods/find')
SBFNode.prototype.getAdapter = require('./methods/getAdapter')
SBFNode.prototype.getTreeOptions = require('./methods/getTreeOptions')
SBFNode.prototype.insert = require('./methods/insert')
SBFNode.prototype.insertReferenceKey = require('./methods/insertReferenceKey')
SBFNode.prototype.isFull = require('./methods/isFull')
SBFNode.prototype.split = require('./methods/split')
module.exports = SBFNode;

import {generateNodeId} from '../../utils/crypto.js';
import SBFLeaf from '../SBFLeaf/SBFLeaf.js';
import attachLeaf from "./methods/attachLeaf.js";
import find from "./methods/find.js";
import findLowerThan from "./methods/findLowerThan.js";
import findGreaterThan from "./methods/findGreaterThan.js";
import getAdapter from "./methods/getAdapter.js";
import getAll from "./methods/getAll.js";
import getFillStatus from "./methods/getFillStatus.js";
import getTreeOptions from "./methods/getTreeOptions.js";
import insert from "./methods/insert.js";
import insertReferenceKey from "./methods/insertReferenceKey.js";
import isFull from "./methods/isFull.js";
import mergeUp from "./methods/mergeUp.js";
import remove from "./methods/remove.js";
import replace from "./methods/replace.js";
import split from "./methods/split.js";

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
    this.id = (props.id) ? props.id : generateNodeId();

    this.fieldName = (props.parent.fieldName) ? props.parent.fieldName : null;

    this.keys = (props.keys) ? props.keys : [];

    this.childrens = [];

    if(props.childrens){
      props.childrens.forEach((child)=>{
        if(child.type==='leaf'){
          this.childrens.push(new SBFLeaf({parent:this,...child}))
        }
        if(child.type==='node'){
          this.childrens.push(new SBFNode({parent:this,...child}))
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
    return this.#parent.getTree() || this.#parent.getParent().getTree();
  }

};
SBFNode.prototype.attachLeaf = attachLeaf;
SBFNode.prototype.find = find;
SBFNode.prototype.findLowerThan = findLowerThan;
SBFNode.prototype.findGreaterThan = findGreaterThan
SBFNode.prototype.getAdapter = getAdapter;
SBFNode.prototype.getAll = getAll;
SBFNode.prototype.getFillStatus = getFillStatus;
SBFNode.prototype.getTreeOptions = getTreeOptions;
SBFNode.prototype.insert = insert;
SBFNode.prototype.insertReferenceKey = insertReferenceKey;
SBFNode.prototype.isFull = isFull;
SBFNode.prototype.mergeUp = mergeUp;
SBFNode.prototype.remove = remove;
SBFNode.prototype.replace = replace;
SBFNode.prototype.split = split;
export default SBFNode;

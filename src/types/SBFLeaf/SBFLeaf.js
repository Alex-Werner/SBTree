import {generateLeafId} from '../../utils/crypto.js';
import split from "./methods/split.js";
import replace from "./methods/replace.js";
import remove from "./methods/remove.js";
import redistribute from "./methods/redistribute.js";
import mergeWithSiblings from "./methods/mergeWithSiblings.js";
import isFull from "./methods/isFull.js";
import isFillFactorFilled from "./methods/isFillFactorFilled.js";
import findGreaterThan from "./methods/findGreaterThan.js";
import findLowerThan from "./methods/findLowerThan.js";
import getRight from "./methods/getRight.js";
import getLeft from "./methods/getLeft.js";
import getFillStatus from "./methods/getFillStatus.js";
import getAll from "./methods/getAll.js";
import find from "./methods/find.js";
import insert from "./methods/insert.js";
/**
 * SFBLeaf
 *
 */
class SFBLeaf {
  #parent
  constructor(props){
    if(!props.parent){
      throw new Error(`SFBLeaf initialized without parent reference`)
    }

    this.#parent = props.parent;
    // this.childrens = [];
    // this.keys = [];
    // this.identifiers = [];
    this.id = (props.id) ? props.id : generateLeafId();
    this.fieldName = (props.parent.fieldName) ? props.parent.fieldName : null;
    this.type = 'leaf';
  }
  getParent(){
    return this.#parent;
  }
  setParent(parent){
    this.#parent = parent
  }
};
SFBLeaf.prototype.insert = insert;
SFBLeaf.prototype.find = find;
SFBLeaf.prototype.getAll = getAll;
SFBLeaf.prototype.getFillStatus = getFillStatus;
SFBLeaf.prototype.getLeft = getLeft;
SFBLeaf.prototype.getRight = getRight;
SFBLeaf.prototype.findLowerThan = findLowerThan;
SFBLeaf.prototype.findGreaterThan = findGreaterThan;
SFBLeaf.prototype.isFillFactorFilled = isFillFactorFilled;
SFBLeaf.prototype.isFull = isFull;
SFBLeaf.prototype.mergeWithSiblings = mergeWithSiblings;
SFBLeaf.prototype.redistribute = redistribute;
SFBLeaf.prototype.remove = remove;
SFBLeaf.prototype.replace = replace;
SFBLeaf.prototype.split = split;
export default SFBLeaf;

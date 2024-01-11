import isFull from "./methods/isFull.js";
import split from "./methods/split.js";
import attachLeaf from "./methods/attachLeaf.js";
import find from "./methods/find.js";
import getAll from "./methods/getAll.js";
import get from "./methods/get.js";
import getAdapter from "./methods/getAdapter.js";
import getFillStatus from "./methods/getFillStatus.js";
import getTreeOptions from "./methods/getTreeOptions.js";
import remove from "./methods/remove.js";
import replace from "./methods/replace.js";
import insert from "./methods/insert.js";
import insertReferenceKey from "./methods/insertReferenceKey.js";

import {generateRootId} from '../../utils/crypto.js';
import each from "lodash.foreach";
import SBFLeaf from "../SBFLeaf/SBFLeaf.js";
import SBFNode from "../SBFNode/SBFNode.js";

const parseChildrens = (_childrens, _parent)=>{
  const childrens = [];

  each(_childrens, (_children)=>{
    const fieldName = _children.fieldName;

      if(_children.type==='leaf'){
        childrens.push(new SBFLeaf({fieldName,parent:_parent,..._children}))
      }
      else if(_children.type==='node'){
        childrens.push(new SBFNode({fieldName,parent:_parent,..._children}))
      }
  })
  return childrens;
};
/**
 * SBFRoot
 *
 */
class SBFRoot {
  #tree;

  constructor(props) {
    if (!props.tree) {
      throw new Error(`SBFRoot is initialized without any tree referenced`);
    }
    this.#tree = props.tree;
    this.id = (props.id) ? props.id : generateRootId();

    this.fieldName = (props.tree.fieldName) ? props.tree.fieldName : null;

    this.keys = (props.keys) ? props.keys : [];
    // Used when SBFRoot holds value (when size = 0)
    this.identifiers = (props.identifiers) ? props.identifiers : [];

    this.childrens = (props.childrens) ? parseChildrens(props.childrens, this) : [];

    this.type = 'root';
  }

  getTree() {
    return (this.#tree);
  }
};
SBFRoot.prototype.attachLeaf = attachLeaf;
SBFRoot.prototype.find = find;
SBFRoot.prototype.getAll = getAll;
SBFRoot.prototype.get = get;
SBFRoot.prototype.getAdapter = getAdapter;
SBFRoot.prototype.getFillStatus = getFillStatus;
SBFRoot.prototype.getTreeOptions = getTreeOptions;
SBFRoot.prototype.remove = remove;
SBFRoot.prototype.replace = replace;
SBFRoot.prototype.insert = insert;
SBFRoot.prototype.insertReferenceKey = insertReferenceKey;
SBFRoot.prototype.isFull = isFull;
SBFRoot.prototype.split = split;
export default SBFRoot;

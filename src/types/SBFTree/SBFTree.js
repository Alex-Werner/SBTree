import {generateFieldTreeId} from '../../utils/crypto.js';
import find from "./methods/find.js";
import insert from "./methods/insert.js";
import get from "lodash.get";
import remove from "./methods/remove.js";
import replace from "./methods/replace.js";
import createRoot from "./methods/createRoot.js";
/**
 * SBFTree
 *
 */
class SBFTree {
  #adapter
  constructor(props={}){
    const defaultOpts = {
      order: 511,
      fillFactor: 0.5,
      verbose:false,
      isUnique:false
    }
    this.id = (props.id) ? props.id : generateFieldTreeId();

    Object.assign(SBFTree.prototype, {
      createRoot: createRoot
    });

    this.order= (props.order) ? props.order : defaultOpts.order;
    this.verbose= (props.verbose) ? props.verbose : defaultOpts.verbose;
    this.fillFactor= (props.fillFactor) ? props.fillFactor : defaultOpts.fillFactor;

    if(!props.fieldName){
      throw new Error(`SBFTree expect a fieldName to be initialized`);
    }
    this.fieldName = (props.fieldName) ? props.fieldName : null;
    this.isUnique = (props.isUnique!==undefined) ? props.isUnique : defaultOpts.isUnique;
    if(props.root){
      this.createRoot(props.root)
    }else{
      this.root = null;
    }
    if(!props.adapter){
      throw new Error(`SBFTree expect an adapter to be initialized`);
    }
    this.#adapter = props.adapter;
  }

  getAdapter(){
    return this.#adapter;
  }

  getOptions(){
    const {order, fillFactor, verbose}= this;
    return {
      order, fillFactor, verbose
    }
  }
};

SBFTree.prototype.find = find;
SBFTree.prototype.get = get;
SBFTree.prototype.insert = insert;
SBFTree.prototype.remove = remove;
SBFTree.prototype.replace = replace;
export default SBFTree;

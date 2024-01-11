import EventEmitter from 'events';
import {MemoryAdapter, FsAdapter} from '../../adapters/index.js';
import {generateTreeId} from '../../utils/crypto.js';
import each from 'lodash.foreach';
import SBFTree from '../SBFTree/SBFTree.js';
import toJSON from "./methods/toJSON.js";
import setFieldTree from "./methods/setFieldTree.js";
import loadState from "./methods/loadState.js";
import replaceDocuments from "./methods/replaceDocuments.js";
import insertDocuments from "./methods/insertDocuments.js";
import getFieldTree from "./methods/getFieldTree.js";
import getDocument from "./methods/getDocument.js";
import getAdapter from "./methods/getAdapter.js";
import findDocuments from "./methods/findDocuments.js";
import deleteDocuments from "./methods/deleteDocuments.js";

const Adapters = {MemoryAdapter, FsAdapter};
const parseAdapter = (_adapterOpts) =>{
  if(!Adapters[_adapterOpts.name]){
    throw new Error(`Unknown adapter ${_adapterOpts.name}`);
  }
  return new Adapters[_adapterOpts.name](_adapterOpts)
}

/**
 * SBTree
 *
 */
class SBTree extends EventEmitter {
  #emitter = new EventEmitter();
  constructor(props = {}) {
    super();
    const self = this;
    Object.assign(SBTree.prototype, {
      setFieldTree: setFieldTree,
    });
    const defaultProps = {
      order: 511,
      // FillFactor should not be less than half.
      fillFactor: 0.5,
      verbose:false,
      fieldTrees:{},
      size:0,
      exclude:[],
      uniques:[],
    };

    this.state = {
      isReady: true
    }
    this.adapter = (props.adapter) ? parseAdapter(props.adapter) : new MemoryAdapter();

    if(this.adapter.name !== 'MemoryAdapter'){
      // We will need to sync up first
      this.state.isReady = false;
      self.adapter.on('ready', ()=> self.state.isReady = true);
    }

    this.order= (props.order) ? props.order : defaultProps.order;
    this.fillFactor= (props.fillFactor) ? props.fillFactor : defaultProps.fillFactor;
    this.verbose= (props.verbose) ? props.verbose : defaultProps.verbose;

    this.id = (props.id) ? props.id : generateTreeId();

    this.uniques = (props.uniques) ? props.uniques : defaultProps.uniques;
    this.exclude = (props.exclude) ? props.exclude : defaultProps.exclude;
    this.size = (props.size!==undefined) ? props.size : defaultProps.size;

    this.fieldTrees = (props.fieldTrees!==undefined) ? {} : defaultProps.fieldTrees;
    if(props.fieldTrees){
      each(props.fieldTrees, (_fieldTree, _fieldTreeName)=>{
        this.setFieldTree(_fieldTree);
      })
    }
    if(this.adapter.attachParent){
      this.adapter.attachParent(this).then(()=>{
        this.emit('ready');
      })
    }else{
      setTimeout(()=>{
        this.emit('ready');
      },10)
    }

  }
  on(){
    this.#emitter.on(...arguments)
  }
   once(){
    this.#emitter.once(...arguments)
  }
  emit(){
    this.#emitter.emit(...arguments)
  }
  getOptions(){
    const {order, fillFactor, verbose}= this;
    return {
      order, fillFactor, verbose
    }
  }
  async isReady() {
    return new Promise((resolve) => {
      if (this.state.isReady) return resolve(true);
      this.once('ready', () => resolve(true));
    });
  }
}


SBTree.prototype.deleteDocuments = deleteDocuments;
SBTree.prototype.findDocuments = findDocuments;
SBTree.prototype.getAdapter = getAdapter;
SBTree.prototype.getDocument = getDocument;
SBTree.prototype.getFieldTree = getFieldTree;
SBTree.prototype.insertDocuments = insertDocuments;
SBTree.prototype.replaceDocuments = replaceDocuments;
SBTree.prototype.loadState = loadState;
SBTree.prototype.setFieldTree = setFieldTree;
SBTree.prototype.toJSON = toJSON;
export default SBTree;

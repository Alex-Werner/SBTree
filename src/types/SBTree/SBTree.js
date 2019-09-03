const EventEmitter = require('events');
const {MemoryAdapter} = require('../../adapters');

const defaultProps = {
  options:{
    order: 16,
    verbose:false
  },
  fieldTrees:{},
  size:0
};

/**
 * SBTree
 *
 */
class SBTree extends EventEmitter {
  #emitter = new EventEmitter();
  constructor(props = {}) {
    super();
    this.options = {
      order: (props.order) ? props.order : defaultProps.options.order,
      verbose: (props.verbose) ? props.verbose : defaultProps.options.verbose
    };

    this.fieldTrees = (props.fieldTrees!==undefined) ? props.fieldTrees : defaultProps.fieldTrees;
    this.size = (props.size!==undefined) ? props.size : defaultProps.size;
    this.adapter = (props.adapter) ? props.adapter : new MemoryAdapter();
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
  emit(){
    this.#emitter.emit(...arguments)
  }
}


SBTree.prototype.findDocuments = require('./methods/findDocuments')
SBTree.prototype.getDocument = require('./methods/getDocument')
SBTree.prototype.getFieldTree = require('./methods/getFieldTree')
SBTree.prototype.insertDocuments = require('./methods/insertDocuments')
SBTree.prototype.loadState = require('./methods/loadState')
SBTree.prototype.setFieldTree = require('./methods/setFieldTree')
SBTree.prototype.toJSON = require('./methods/toJSON')
module.exports = SBTree;

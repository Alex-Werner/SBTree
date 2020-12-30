const {FSLock} = require('fslockjs');
const EventEmitter = require('events');
const defaultProps = {
    path: '.db',
    //TODO : Ideally, when false, we keep a set of deferred job that we execute once saveDatabase is called.
    autoSave: true,
    autoSaveInterval: 5000,
    autoLoad: true,
    autoLoadCallback: null,
}

class FsAdapter extends EventEmitter {
  #parent;
  constructor(props = {}) {
    super();
    this.name = "FsAdapter";

    if(props.parent){
      this.setParent(props.parent)
    }
    this.leafs = (props.leafs) ? props.leafs : {};
    this.path= (props.path) ? (props.path) : defaultProps.path;
    this.autoSave= (props.autoSave !== undefined) ? (props.autoSave) : defaultProps.autoSave;
    this.autoSaveInterval= (props.autoSaveInterval !== undefined) ? (props.autoSaveInterval) : defaultProps.autoSaveInterval;
    this.autoLoad= (props.autoLoad !== undefined) ? (props.autoLoad) : defaultProps.autoLoad;
    this.autoLoadCallback= (props.autoLoadCallback !== undefined) ? (props.autoLoadCallback) : defaultProps.autoLoadCallback;

    if (!this.autoLoad && this.autoLoadForceOverwrite === undefined) {
      throw new Error('Not implemented : Overwrite graceful handle. Pass autoLoadForceOverwrite to force.');
    }
    this.lastChange = null;
    this.lastSave = null;
    this.queue = new FSLock();
    this.isReady = true;
    if(props.leafs){
      this.isReady = false;
    }
  }
  setParent(parent){
    this.#parent = parent;
  }
  getParent(){
    return this.#parent;
  }
};
//TODO : Optimization possible by just removing the LeafMeta from memory for disk instead, but existance search will be slower.
//TODO : LRU Cache

FsAdapter.prototype.attachParent = require('./methods/attachParent');
FsAdapter.prototype.addInLeaf = require('./methods/addInLeaf')
FsAdapter.prototype.createLeaf = require('./methods/createLeaf')
FsAdapter.prototype.findInLeaf = require('./methods/findInLeaf')
FsAdapter.prototype.getAllInLeaf = require('./methods/getAllInLeaf')
FsAdapter.prototype.getLeftInLeaf = require('./methods/getLeftInLeaf')
FsAdapter.prototype.getRightInLeaf = require('./methods/getRightInLeaf')
FsAdapter.prototype.getDocument = require('./methods/getDocument')
FsAdapter.prototype.insertSortedInLeaf = require('./methods/insertSortedInLeaf')
FsAdapter.prototype.loadDatabase = require('./methods/loadDatabase')
FsAdapter.prototype.openDocument = require('./methods/openDocument')
FsAdapter.prototype.openLeaf = require('./methods/openLeaf')
FsAdapter.prototype.removeDocument = require('./methods/removeDocument');
FsAdapter.prototype.openLeafData = require('./methods/openLeafData')
FsAdapter.prototype.replaceDocument = require('./methods/replaceDocument')
FsAdapter.prototype.replaceInLeaf = require('./methods/replaceInLeaf')
FsAdapter.prototype.saveDatabase = require('./methods/saveDatabase')
FsAdapter.prototype.saveDocument = require('./methods/saveDocument')
FsAdapter.prototype.saveLeafData = require('./methods/saveLeafData')
FsAdapter.prototype.splitLeaf = require('./methods/splitLeaf')
FsAdapter.prototype.updateDocument = require('./methods/updateDocument')
module.exports = FsAdapter;

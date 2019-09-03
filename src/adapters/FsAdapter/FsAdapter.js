const {FSLock} = require('fslockjs');
const EventEmitter = require('events');
const defaultProps = {
  options: {
    path: '.db',
    //TODO : Ideally, when false, we keep a set of deferred job that we execute once saveDatabase is called.
    autoSave: true,
    autoSaveInterval: 5000,
    autoLoad: true,
    autoLoadCallback: null,
  }
}

class FsAdapter extends EventEmitter {
  constructor(props = {}) {
    super();
    if(props.parent){
      this.parent = props.parent
    }
    this.leafs = (props.leafs) ? props.leafs : {};
    this.options = {
      path: (props.path) ? (props.path) : defaultProps.options.path,
      autoSave: (props.autoSave !== undefined) ? (props.autoSave) : defaultProps.options.autoSave,
      autoSaveInterval: (props.autoSaveInterval !== undefined) ? (props.autoSaveInterval) : defaultProps.options.autoSaveInterval,
      autoLoad: (props.autoLoad !== undefined) ? (props.autoLoad) : defaultProps.options.autoLoad,
      autoLoadCallback: (props.autoLoadCallback !== undefined) ? (props.autoLoadCallback) : defaultProps.options.autoLoadCallback,
    }
    if (!this.options.autoLoad && this.options.autoLoadForceOverwrite === undefined) {
      throw new Error('Not implemented : Overwrite graceful handle. Pass autoLoadForceOverwrite to force.');
    }
    this.lastChange = null;
    this.lastSave = null;
    this.queue = new FSLock();
  }
};
//TODO : Optimization possible by just removing the LeafMeta from memory for disk instead, but existance search will be slower.
//TODO : LRU Cache

FsAdapter.prototype.attachParent = require('./methods/attachParent');
FsAdapter.prototype.addInLeaf = require('./methods/addInLeaf')
FsAdapter.prototype.createLeaf = require('./methods/createLeaf')
FsAdapter.prototype.findInLeaf = require('./methods/findInLeaf')
FsAdapter.prototype.getDocument = require('./methods/getDocument')
FsAdapter.prototype.insertSortedInLeaf = require('./methods/insertSortedInLeaf')
FsAdapter.prototype.loadDatabase = require('./methods/loadDatabase')
FsAdapter.prototype.openDocument = require('./methods/openDocument')
FsAdapter.prototype.openLeaf = require('./methods/openLeaf')
FsAdapter.prototype.openLeafData = require('./methods/openLeafData')
FsAdapter.prototype.saveDatabase = require('./methods/saveDatabase')
FsAdapter.prototype.saveDocument = require('./methods/saveDocument')
FsAdapter.prototype.saveLeafData = require('./methods/saveLeafData')
FsAdapter.prototype.splitLeaf = require('./methods/splitLeaf')
FsAdapter.prototype.updateDocument = require('./methods/updateDocument')
module.exports = FsAdapter;

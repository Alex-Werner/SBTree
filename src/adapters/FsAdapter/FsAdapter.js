class FsAdapter {
  constructor(props = {}){
    this.leafs=(props.leafs) ? props.leafs : {};
    this.options={
      path:(props.path) ? (props.path) : '.db'
    }
  }
};
//TODO : Optimization possible by just removing the LeafMeta from memory for disk instead, but existance search will be slower.
//TODO : LRU Cache

FsAdapter.prototype.addInLeaf = require('./methods/addInLeaf')
FsAdapter.prototype.createLeaf = require('./methods/createLeaf')
FsAdapter.prototype.findInLeaf = require('./methods/findInLeaf')
FsAdapter.prototype.getDocument = require('./methods/getDocument')
FsAdapter.prototype.insertSortedInLeaf = require('./methods/insertSortedInLeaf')
FsAdapter.prototype.openLeaf = require('./methods/openLeaf')
FsAdapter.prototype.openDocument = require('./methods/openDocument')
FsAdapter.prototype.openLeafData = require('./methods/openLeafData')
FsAdapter.prototype.saveDocument = require('./methods/saveDocument')
FsAdapter.prototype.saveLeafData = require('./methods/saveLeafData')
FsAdapter.prototype.splitLeaf = require('./methods/splitLeaf')
FsAdapter.prototype.updateDocument = require('./methods/updateDocument')
module.exports = FsAdapter;

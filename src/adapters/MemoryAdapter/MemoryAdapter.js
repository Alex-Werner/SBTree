
class MemoryAdapter {
  constructor(){
    this.leafs = {};
    this.documents = {}
  }
};
MemoryAdapter.prototype.addInLeaf = require('./methods/addInLeaf')
MemoryAdapter.prototype.createLeaf = require('./methods/createLeaf')
MemoryAdapter.prototype.getAllInLeaf = require('./methods/getAllInLeaf')
MemoryAdapter.prototype.getLeftInLeaf = require('./methods/getLeftInLeaf')
MemoryAdapter.prototype.getRightInLeaf = require('./methods/getRightInLeaf')
MemoryAdapter.prototype.findInLeaf = require('./methods/findInLeaf')
MemoryAdapter.prototype.getDocument = require('./methods/getDocument')
MemoryAdapter.prototype.openLeaf = require('./methods/openLeaf')
MemoryAdapter.prototype.removeInLeaf = require('./methods/removeInLeaf')
MemoryAdapter.prototype.saveDocument = require('./methods/saveDocument')
MemoryAdapter.prototype.splitLeaf = require('./methods/splitLeaf');
module.exports = MemoryAdapter;

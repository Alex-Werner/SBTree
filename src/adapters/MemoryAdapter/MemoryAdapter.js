
class MemoryAdapter {
  constructor(){
    this.leafs = {};
    this.documents = {}
  }
};
MemoryAdapter.prototype.addInLeaf = require('./methods/addInLeaf')
MemoryAdapter.prototype.createLeaf = require('./methods/createLeaf')
MemoryAdapter.prototype.findAllInLeaf = require('./methods/findAllInLeaf')
MemoryAdapter.prototype.findInLeaf = require('./methods/findInLeaf')
MemoryAdapter.prototype.getDocument = require('./methods/getDocument')
MemoryAdapter.prototype.openLeaf = require('./methods/openLeaf')
MemoryAdapter.prototype.splitLeaf = require('./methods/splitLeaf');
module.exports = MemoryAdapter;

const each = require('lodash.foreach');
const Data = require('./types/Data');
const Meta = require('./types/Meta');

const parseLeafs = (_leafs) => {
  const leafs = {};
  each(_leafs, (_leaf, _leafId) => {
    leafs[_leafId] = {
      meta: new Meta(_leaf.meta),
      data: new Data(_leaf.data),
    };
  });
  return leafs;
};
class MemoryAdapter {
  constructor(props = {}) {
    this.name = 'MemoryAdapter';
    this.leafs = (props.leafs) ? parseLeafs(props.leafs) : {};
    this.documents = (props.documents) ? props.documents : {};
    this.isReady = true;
  }
}
MemoryAdapter.prototype.addInLeaf = require('./methods/addInLeaf');
MemoryAdapter.prototype.createLeaf = require('./methods/createLeaf');
MemoryAdapter.prototype.getAllInLeaf = require('./methods/getAllInLeaf');
MemoryAdapter.prototype.getLeftInLeaf = require('./methods/getLeftInLeaf');
MemoryAdapter.prototype.getRightInLeaf = require('./methods/getRightInLeaf');
MemoryAdapter.prototype.findInLeaf = require('./methods/findInLeaf');
MemoryAdapter.prototype.getDocument = require('./methods/getDocument');
MemoryAdapter.prototype.openLeaf = require('./methods/openLeaf');
MemoryAdapter.prototype.removeDocument = require('./methods/removeDocument');
MemoryAdapter.prototype.removeInLeaf = require('./methods/removeInLeaf');
MemoryAdapter.prototype.replaceDocument = require('./methods/replaceDocument');
MemoryAdapter.prototype.replaceInLeaf = require('./methods/replaceInLeaf');
MemoryAdapter.prototype.saveDocument = require('./methods/saveDocument');
MemoryAdapter.prototype.splitLeaf = require('./methods/splitLeaf');

export default MemoryAdapter;

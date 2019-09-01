const {MemoryAdapter} = require('../../adapters');

const defaultOpts = {
  order: 16,
  verbose:false
};

/**
 * SBTree
 *
 */
class SBTree {
  constructor(props = {}) {
    this.options = {
      order: (props.order) ? props.order : defaultOpts.order,
      verbose: (props.verbose) ? props.verbose : defaultOpts.verbose
    };
    this.fieldTrees = {};
    this.size = 0;
    this.adapter = (props.adapter) ? props.adapter : new MemoryAdapter();
  }
}


SBTree.prototype.findDocuments = require('./methods/findDocuments')
SBTree.prototype.getDocument = require('./methods/getDocument')
SBTree.prototype.getFieldTree = require('./methods/getFieldTree')
SBTree.prototype.insertDocuments = require('./methods/insertDocuments')
SBTree.prototype.setFieldTree = require('./methods/setFieldTree')
module.exports = SBTree;

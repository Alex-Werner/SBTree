const defaultOpts = {
  order: 16,
  verbose:false
}
/**
 * SBFTree
 *
 */
class SBFTree {
  constructor(props={}){
    this.options = {
      order:(props.order) ? props.order : defaultOpts.order,
      verbose: (props.verbose) ? props.verbose : defaultOpts.verbose
    };
    if(!props.field){
      throw new Error(`SBFTree expect a field to be initialized`);
    }
    this.field = (props.field) ? props.field : null;
    this.root = (props.root) ? props.root : null;
    if(!props.adapter){
      throw new Error(`SBFTree expect an adapter to be initialized`);
    }
    this.adapter = props.adapter;
  }
};

SBFTree.prototype.find = require('./methods/find');
SBFTree.prototype.get = require('./methods/get');
SBFTree.prototype.insert = require('./methods/insert');
SBFTree.prototype.createRoot = require('./methods/createRoot');
module.exports = SBFTree;

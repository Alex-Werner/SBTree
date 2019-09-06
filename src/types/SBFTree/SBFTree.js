
/**
 * SBFTree
 *
 */
class SBFTree {
  constructor(props={}){
    const defaultOpts = {
      order: 16,
      verbose:false
    }
    Object.assign(SBFTree.prototype, {
      createRoot: require('./methods/createRoot')
    });

    this.options = {
      order: (props.order) ? props.order : defaultOpts.order,
      verbose: (props.verbose) ? props.verbose : defaultOpts.verbose
    };
    if(!props.field){
      throw new Error(`SBFTree expect a field to be initialized`);
    }
    this.field = (props.field) ? props.field : null;
    if(props.root){
      this.createRoot(props.root)
    }else{
      this.root = null;
    }
    if(!props.adapter){
      throw new Error(`SBFTree expect an adapter to be initialized`);
    }
    this.adapter = props.adapter;
  }
};

SBFTree.prototype.find = require('./methods/find');
SBFTree.prototype.get = require('./methods/get');
SBFTree.prototype.insert = require('./methods/insert');
SBFTree.prototype.remove = require('./methods/remove');
module.exports = SBFTree;

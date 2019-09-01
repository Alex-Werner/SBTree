const SBFTree = require('../../SBFTree/SBFTree');

function setFieldTree(field){
  if (this.fieldTrees[field]) {
    throw new Error(`Setting on already existing field node ${field}`);
  }

  const fieldTree = new SBFTree({field, order:this.options.order, verbose:this.options.verbose});
  this.fieldTrees[field] = fieldTree;
};
module.exports = setFieldTree;

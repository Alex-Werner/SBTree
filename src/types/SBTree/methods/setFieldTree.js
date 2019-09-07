const SBFTree = require('../../SBFTree/SBFTree');

function setFieldTree(field, root = null){
  if (this.fieldTrees[field]) {
    throw new Error(`Setting on already existing field node ${field}`);
  }
  const {adapter} = this;

  const isUnique = this.uniques.includes(field);
  const isExcluded = this.exclude.includes(field);
  if(isExcluded) return;
  const fieldTree = new SBFTree({field, adapter, order:this.options.order, verbose:this.options.verbose, root, isUnique});
  this.fieldTrees[field] = fieldTree;
};
module.exports = setFieldTree;

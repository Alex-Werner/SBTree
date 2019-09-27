const SBFTree = require('../../SBFTree/SBFTree');

function setFieldTree(fieldName, root = null){
  if (this.fieldTrees[fieldName]) {
    throw new Error(`Setting on already existing field node ${fieldName}`);
  }
  const {adapter} = this;

  const isUnique = this.uniques.includes(fieldName);
  const isExcluded = this.exclude.includes(fieldName);
  if(isExcluded) return;
  const fieldTree = new SBFTree({fieldName, adapter, order:this.options.order, verbose:this.options.verbose, root, isUnique});
  this.fieldTrees[fieldName] = fieldTree;
};
module.exports = setFieldTree;

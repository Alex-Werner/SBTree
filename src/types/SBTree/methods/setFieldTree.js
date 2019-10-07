const SBFTree = require('../../SBFTree/SBFTree');

/**
 *
 * @param fieldTreeOpts
 * @param fieldTreeOpts.fieldName - mendatory
 * @param fieldTreeOpts.root -
 * @param fieldTreeOpts.* -
 */
function setFieldTree(_fieldTreeOpts){
  const {fieldName}=_fieldTreeOpts;
  if(!fieldName){
    throw new Error(`Expected a fieldName to set a fieldTree`);
  }
  if (this.fieldTrees[fieldName]) {
    throw new Error(`Setting on already existing field node ${fieldName}`);
  }
  const {adapter} = this;

  const isUnique = this.uniques.includes(fieldName);
  const isExcluded = this.exclude.includes(fieldName);
  if(isExcluded) return;

  const fieldTreeOpts = {
    adapter,
    fieldName,
    ...this.getOptions(),
    isUnique
  };

  if(_fieldTreeOpts.id) fieldTreeOpts.id = _fieldTreeOpts.id;
  if(_fieldTreeOpts.root) fieldTreeOpts.root = _fieldTreeOpts.root;

  const fieldTree = new SBFTree(fieldTreeOpts);
  this.fieldTrees[fieldName] = fieldTree;
};
module.exports = setFieldTree;

function getFieldTree(fieldName){
  const isExcluded = this.exclude.includes(fieldName);
  if(isExcluded) return;

  return this.fieldTrees[fieldName];
};
module.exports = getFieldTree;

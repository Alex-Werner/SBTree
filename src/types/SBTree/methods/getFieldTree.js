function getFieldTree(field){
  const isExcluded = this.exclude.includes(field);
  if(isExcluded) return;

  return this.fieldTrees[field];
};
module.exports = getFieldTree;

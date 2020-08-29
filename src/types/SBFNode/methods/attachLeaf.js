module.exports = async function attachLeaf(index, leaf) {
  this.childrens.splice(index, 0, leaf);
};

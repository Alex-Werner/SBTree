async function attachLeaf(index, leaf) {
  this.childrens.splice(index, 0, leaf);
  // leaf.setParent(this);
}
export default attachLeaf;

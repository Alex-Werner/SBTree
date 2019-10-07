function isFull(){
  const tree = this.getTree();
  const order = tree.order;

  return this.keys.length>=order;
};
module.exports = isFull;

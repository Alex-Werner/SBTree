function isFull(){
  const tree = this.getTree();
  const order = tree.order;

  console.log(this.keys.length, order)
  return this.keys.length>=order;
};
module.exports = isFull;

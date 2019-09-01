module.exports = function isFull(){
  const tree = this.getTree();
  const order = tree.options.order;
  return this.keys.length>=order;
}

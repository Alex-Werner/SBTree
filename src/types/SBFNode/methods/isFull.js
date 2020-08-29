module.exports = function isFull() {
  const tree = this.getTree();
  const { order } = tree;
  return this.keys.length >= order;
};

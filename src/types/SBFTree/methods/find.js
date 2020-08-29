module.exports = async function find(value, operator) {
  let { root } = this;
  if (!root) {
    this.createRoot();
    root = this.root;
  }
  return await root.find(value, operator);
};

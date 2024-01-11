export default async function find(value, operator) {
  let { root } = this;
  if (!root) {
    this.createRoot();
    root = this.root;
  }
  return root.find(value, operator);
};

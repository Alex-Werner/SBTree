export default async function remove(remCmd) {
  let { root } = this;
  if (!root) {
    this.createRoot();
    root = this.root;
  }
  await root.remove(remCmd);
};

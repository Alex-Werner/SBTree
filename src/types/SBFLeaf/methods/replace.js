async function replace(identifier, value) {
  const parent = this.getParent();

  const adapter = parent.getAdapter();
  await adapter.replaceInLeaf(this.id, identifier, value);
  const isFull = await this.isFull();

  if (isFull) {
    await this.split();
  }
}
module.exports = replace;

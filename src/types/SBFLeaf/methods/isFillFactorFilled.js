async function isFillFactorFilled() {
  const parent = this.getParent();
  const adapter = parent.getAdapter();
  const { fillFactor, order } = parent.getTreeOptions();

  if (fillFactor < 0.5) {
    throw new Error(`FillFactor cannot be less than 0.5. Received ${fillFactor}`);
  }

  const maxKeys = order - 1;
  const minKeys = Math.floor(maxKeys * fillFactor);

  try {
    const leaf = await adapter.openLeaf(this.id);

    return leaf.meta.size >= minKeys;
  } catch (e) {
    if (e.message === 'Leaf do not exist') {
      await adapter.createLeaf(this.id);
      return this.isFillFactorFilled();
    }
    throw e;
  }
}
module.exports = isFillFactorFilled;

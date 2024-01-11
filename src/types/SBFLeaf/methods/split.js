async function split() {
  const SBFLeaf = require('../SBFLeaf');

  const parent = this.getParent();
  const adapter = parent.getAdapter();

  const newLeaf = new SBFLeaf({ parent });

  await adapter.createLeaf(newLeaf.id);
  const midKey = await adapter.splitLeaf(this, newLeaf);

  const index = await parent.insertReferenceKey(midKey);

  await parent.attachLeaf(index + 1, newLeaf);
}
export default split;

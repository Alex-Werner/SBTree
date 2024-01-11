const SBFNode = require('../../SBFNode/SBFNode');
const SBFLeaf = require('../../SBFLeaf/SBFLeaf');
const { forEach } = require('../../../utils/array');

async function split() {
  const {
    childrens, identifiers, keys, fieldName,
  } = this;

  const midIndex = ~~(keys.length / 2);
  const rightKeys = keys.splice(midIndex);
  const leftKeys = keys.splice(0);

  if (childrens.length > 0) {
    const midKey = rightKeys.splice(0, 1)[0];

    const rightChildrens = childrens.splice(midIndex + 1);
    const leftChildrens = childrens.splice(0);

    const right = new SBFNode({ fieldName, parent: this });
    right.keys = rightKeys;
    right.childrens = rightChildrens;
    rightChildrens.forEach((child) => {
      child.setParent(right);
    });

    const left = new SBFNode({ fieldName, parent: this });
    left.keys = leftKeys;
    left.childrens = leftChildrens;
    leftChildrens.forEach((child) => {
      child.setParent(left);
    });

    keys.push(midKey);
    this.childrens = [left, right];
  } else {
    const midKey = rightKeys.slice(0)[0];

    const rightIdentifiers = identifiers.splice(midIndex);
    const leftIdentifiers = identifiers.splice(0);

    const right = new SBFLeaf({ parent: this });
    // FIXME
    await this.getAdapter().createLeaf(right.id);

    await forEach(rightKeys, async (key, i) => {
      await right.insert(rightIdentifiers[i], key);
    });

    // FIXME
    const left = new SBFLeaf({ parent: this });
    await this.getAdapter().createLeaf(left.id);

    await forEach(leftKeys, async (key, i) => {
      await left.insert(leftIdentifiers[i], key);
    });

    keys.push(midKey);

    this.childrens = [left, right];
  }
}
export default split;

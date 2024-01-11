async function mergeWithSiblings() {
  const parent = this.getParent();

  const selfId = this.id;
  const selfPos = parent.childrens.findIndex((el) => el.id === selfId);
  let hasMerged = false;

  const siblings = {};

  if (selfPos >= 0) siblings.left = parent.childrens[selfPos - 1];
  if (parent.childrens.length > selfPos + 1) siblings.right = parent.childrens[selfPos + 1];

  if (siblings.left) siblings.leftStatus = await siblings.left.getFillStatus();
  if (siblings.right) siblings.rightStatus = await siblings.right.getFillStatus();

  if (siblings.right && (selfPos === 0 || !siblings.left)) {
    const rightSib = siblings.right;

    const rightSibPos = selfPos + 1;
    const { identifiers, keys } = await rightSib.getAll();

    const p = [];
    identifiers.forEach((identifier, i) => {
      const key = keys[i];
      p.push(this.insert(identifier, key));
    });
    await Promise.all(p);

    // Kill parent's children
    delete parent.childrens[rightSibPos];

    // Remove the undefined corpse from the array
    parent.childrens.splice(rightSibPos, 1);

    // Repair parent keys TODO FIXME
    const parentKeys = parent.keys;

    // We remove the children reference in keys
    parent.keys.splice(parseInt(selfPos / 2), 1);
    if (parent.keys.length === 0) {
    //   We have no keys, let's merge up.
      await parent.mergeUp();
    }

    hasMerged = true;
  } else if (siblings.left) {
    const leftSib = siblings.left;
    const leftSibPos = selfPos - 1;
    const { identifiers, keys } = await leftSib.getAll();

    const p = [];
    identifiers.forEach((identifier, i) => {
      const key = keys[i];
      p.push(this.insert(identifier, key));
    });
    await Promise.all(p);

    // Kill parent's children
    delete parent.childrens[leftSibPos];

    // Remove the undefined corpse from the array
    parent.childrens.splice(leftSibPos, 1);

    // Repair parent keys TODO FIXME
    const parentKeys = parent.keys;

    // We remove the children reference in keys
    parent.keys.splice(parseInt(selfPos / 2), 1);
    if (parent.keys.length === 0) {
      // console.log('====')
      // console.log(parent)
      // throw new Error('Not implemented. Looking for case.')
      // We have no keys, let's merge up.
      await parent.mergeUp();
      // }
    }
    hasMerged = true;
  }

  if (!hasMerged) {
    throw new Error('Failed to merge with siblings');
  }
  return hasMerged;
}
export default mergeWithSiblings;

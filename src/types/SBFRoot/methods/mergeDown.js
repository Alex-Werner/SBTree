/**
 * Merge the node with it's parent (thus : up).
 * Used mostly from the results of a merge from leafs when it result in emptying parent node keys.
 * Parent node is then called for some mergeUp.
 *
 * @returns {Promise<void>}
 */
const mergeDown = async function () {
  const parent = this.getParent();
  const { childrens, keys, id } = this;

  // parent.childrens.splice(selfPos, 1, childrens[0]);
  // console.log(selfPos);
  // console.log(parent.keys);
  // console.log(parent)

  // console.log(this)
  // console.log(await parent.getFillStatus())
  console.log('Mergeup');
  throw new Error('Unsupported merge up');
};
module.exports = mergeDown;

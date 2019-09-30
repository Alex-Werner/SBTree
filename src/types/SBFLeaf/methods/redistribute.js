/**
 * Try to balance the leaf in order to get itself to reach fillFactor
 * In order to do that, it will try to borrow siblings (sharing similar parent)
 *
 * @returns {Promise<boolean>}
 */
async function redistribute(){
  const parent = this.getParent();
  const adapter = parent.getAdapter();

  throw new Error('Not implemented error');
};
module.exports = redistribute;

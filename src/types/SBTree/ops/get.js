const cloneDeep = require('lodash.clonedeep');

async function get(identifier) {
  if (!identifier) throw new Error('Expected an objectid');

  const res = await this.adapter.getDocument(identifier);

  return cloneDeep(res) || null;
}
module.exports = get;

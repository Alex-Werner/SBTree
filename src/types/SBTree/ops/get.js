const { cloneDeep }= require('lodash');
async function get(identifier) {
  if (!identifier) throw new Error('Expected an objectid')

  const res = await this.adapter.getDocument(identifier);

  return cloneDeep(res) || false;
};
module.exports = get;

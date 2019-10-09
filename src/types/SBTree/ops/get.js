async function get(identifier) {
  if (!identifier) throw new Error('Expected an objectid')

  const res = await this.adapter.getDocument(identifier);

  return res || false;
};
module.exports = get;

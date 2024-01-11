import cloneDeep from "lodash.clonedeep";
async function get(identifier) {
  if (!identifier) throw new Error('Expected an objectid');

  const res = await this.adapter.getDocument(identifier);

  return cloneDeep(res) || null;
}

export default get;

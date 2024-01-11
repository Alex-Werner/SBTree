async function get(identifier) {
  const adapter = this.getAdapter();
  return await adapter.getDocument(identifier);
}
export default get;

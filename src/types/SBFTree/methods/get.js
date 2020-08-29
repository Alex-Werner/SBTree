module.exports = async function get(identifier) {
  return await this.root.get(identifier);
};

module.exports = async function get(identifier){
  await this.root.get(identifier);
}

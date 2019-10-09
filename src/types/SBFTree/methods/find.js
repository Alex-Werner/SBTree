module.exports = async function find(value, operator){
  return await this.root.find(value, operator);
}

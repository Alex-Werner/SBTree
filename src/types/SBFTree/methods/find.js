module.exports = async function find(value, operator){
  let root = this.root;
  if(!root){
    this.createRoot();
    root = this.root;
  }
  return await root.find(value, operator);
}

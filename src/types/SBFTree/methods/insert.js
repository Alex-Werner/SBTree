module.exports = async function insert(identifier, value){
  let root = this.root;
  if(!root){
    this.createRoot();
     root = this.root;
  }
  if(this.isUnique){
    const get = await this.find(value, '$eq');
    if(get.length>0){
      return false
    }
  }
  await root.insert(identifier, value);
}

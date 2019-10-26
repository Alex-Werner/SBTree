module.exports = async function replace(identifier, value){
  let root = this.root;
  if(!root){
    this.createRoot();
     root = this.root;
  }
  if(this.isUnique){
    const get = await this.find(value, '$eq');
    if(get.identifiers.length>0){
      return false
    }
  }
  await root.replace(identifier, value);
}

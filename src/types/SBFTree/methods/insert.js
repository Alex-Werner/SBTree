module.exports = async function insert(identifier, value){
  if(!this.root){
    this.createRoot();
  }
  if(this.isUnique){
    const get = await this.find(value, '$eq');
    if(get.length>0){
      return false
    }
  }
    await this.root.insert(identifier, value);
}

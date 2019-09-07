module.exports = async function insert(key, identifier){
  if(!this.root){
    this.createRoot();
  }
  if(this.isUnique){
    const get = await this.find(key, '$eq');
    if(get.length>0){
      return false
    }
  }
    await this.root.insert(key, identifier);
}

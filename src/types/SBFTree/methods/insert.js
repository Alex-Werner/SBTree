module.exports = async function insert(key, identifier){
  if(!this.root){
    this.createRoot();
  }
  await this.root.insert(key, identifier);
}

module.exports = async function remove(identifier){
    await this.root.remove(identifier);
}

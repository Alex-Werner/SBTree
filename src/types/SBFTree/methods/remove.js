module.exports = async function remove(remCmd){
    let root = this.root;
    if(!root){
        this.createRoot();
        root = this.root;
    }
    await root.remove(remCmd);
}

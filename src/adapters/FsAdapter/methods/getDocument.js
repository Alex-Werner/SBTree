module.exports = async function getDocument(identifier){
  return JSON.parse(JSON.stringify(await this.openDocument(identifier)));
}

async function saveDocument(doc){
  const identifier = doc._id;
  if(!this.documents[identifier]){
    this.documents[identifier] = doc;
  }
}
module.exports = saveDocument

module.exports = async function getDocument(identifier){
  const doc = this.documents[identifier];
  if(doc){
    return JSON.parse(JSON.stringify(this.documents[identifier]));
  }
  return {_id:identifier};
};

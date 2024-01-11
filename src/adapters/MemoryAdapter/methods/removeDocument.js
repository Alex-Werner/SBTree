async function removeDocument(identifier) {
  if (this.documents[identifier]) {
    delete this.documents[identifier];
  }
}
export default removeDocument;

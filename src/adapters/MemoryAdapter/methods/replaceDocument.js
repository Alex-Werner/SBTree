async function replaceDocument(doc) {
  if (!this.documents[doc._id]) {
    this.saveDocument(doc);
  }
  this.documents[doc._id] = doc;
}
module.exports = replaceDocument;

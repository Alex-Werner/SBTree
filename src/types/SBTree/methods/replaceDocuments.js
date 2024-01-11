import replace from '../ops/replace.js';
async function replaceDocuments(documents) {
  if (!this.state.isReady) {
    await this.isReady();
  }
  if (Array.isArray(documents)) {
    for (const document of documents) {
      await this.replaceDocuments(document);
    }
    return documents;
  }

  const currentDocument = await this.getDocument(documents._id);
  return ([await replace.call(this, currentDocument, documents)]);
}

export default replaceDocuments;

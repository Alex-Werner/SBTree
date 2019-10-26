const replace = require('../ops/replace');
const {waitFor} = require('../../../utils/fn');

async function replaceDocuments(documents){
  if(!this.isReady){
    await waitFor(this, 'isReady');
  }
  if (Array.isArray(documents)) {
    for (const document of documents) {
      await this.replaceDocuments(document);
    }
    return documents;
  }

  const currentDocument = await this.getDocument(documents._id);
  return (await replace.call(this,currentDocument, documents));

};
module.exports = replaceDocuments;

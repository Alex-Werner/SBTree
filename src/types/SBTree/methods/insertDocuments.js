const ObjectId = require('mongo-objectid');
const cloneDeep = require('lodash.clonedeep');
const insert = require('../ops/insert');

/**
 * Allow to insert of or multiple documents
 *
 * @param documents
 * @returns {Promise<[{documents}]>} - copy of the inserted (mutated with _id) document.
 */
async function insertDocuments(documents) {
  // This will wait for SBTree to have isReady = true.
  // When so, it will then perform the insertion.
  if (!this.state.isReady) {
    await this.isReady();
  }

  if (Array.isArray(documents)) {
    let insertedDocumentsResultats = [];
    for (const document of documents) {
      insertedDocumentsResultats.push(...await this.insertDocuments(document));
    }
    return insertedDocumentsResultats;
  }

  const document = cloneDeep(documents);

  if (!document._id) {
    document._id = new ObjectId().toString();
  }
  await insert.call(this, document);

  this.size += 1;

  return [document];
}
module.exports = insertDocuments;

const ObjectId = require('mongo-objectid');
const insert = require('../ops/insert');
const {waitFor} = require('../../../utils/fn');
const {cloneDeep}= require('lodash');

async function insertDocuments(documents) {
  // This will wait for SBTree to have isReady = true.
  // When so, it will then perform the insertion.
  if(!this.isReady){
    await waitFor(this, 'isReady');
  }

  if (Array.isArray(documents)) {
    for (const document of documents) {
      await this.insertDocuments(document);
    }
    return documents;
  }
  const document = cloneDeep(documents);

  if (!document._id) {
    document._id = new ObjectId().toString();
  }
  await insert.call(this, document);

  this.size += 1;

  return document;
};
module.exports = insertDocuments;

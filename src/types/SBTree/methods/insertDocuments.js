const ObjectId = require('mongo-objectid');
const insert = require('../ops/insert');
const { map } = require('lodash');
async function insertDocuments(documents){
  if(Array.isArray(documents)){
    for (const document of documents) {
      await this.insertDocuments(document);
    }
    return documents;
  }
  const document = JSON.parse(JSON.stringify(documents));

  if(!document._id ){
    document._id = new ObjectId().toString();
  }
  await insert.call(this, document);

  this.size += 1;

  return document;
};
module.exports = insertDocuments;

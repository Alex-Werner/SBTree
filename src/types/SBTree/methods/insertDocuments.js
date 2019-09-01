const ObjectId = require('mongo-objectid');
const insert = require('../ops/insert');

async function insertDocuments(documents){
  if(Array.isArray(documents)){
    return documents.map( (document)=>{
      return this.insertDocuments(document);
    })
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

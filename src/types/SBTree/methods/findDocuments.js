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
  insert(this, document);
  this.size += 1;
};
module.exports = insertDocuments;

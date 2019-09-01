const query = require('../ops/query');

async function findDocuments(params){
  return (query.call(this,params));

};
module.exports = findDocuments;

const query = require('../ops/query');

async function findDocuments(params){
  return (await query.call(this,params));

};
module.exports = findDocuments;

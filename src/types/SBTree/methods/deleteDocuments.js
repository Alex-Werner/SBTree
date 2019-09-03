const remove = require('../ops/remove');

async function deleteDocuments(query){

  return (await remove.call(this,query));

};
module.exports = deleteDocuments;

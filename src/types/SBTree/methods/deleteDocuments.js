const remove = require('../ops/remove');

async function deleteDocuments(query){
  if(!query || query === {}){
    // this would cause to delete all as we would query all.
    throw new Error('Invalid query')
  }

  return (await remove.call(this,query));

};
module.exports = deleteDocuments;

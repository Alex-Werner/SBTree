const remove = require('../ops/remove');
const {waitFor} = require('../../../utils/fn');

async function deleteDocuments(query){
  if(!query || query === {}){
    // this would cause to delete all as we would query all.
    throw new Error('Invalid query')
  }
  if(!this.isReady){
    await waitFor(this, 'isReady');
  }

  return (await remove.call(this,query));

};
module.exports = deleteDocuments;

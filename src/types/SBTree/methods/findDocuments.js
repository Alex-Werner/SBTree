const query = require('../ops/query');
const {waitFor} = require('../../../utils/fn');

async function findDocuments(params){
  if(!this.isReady){
    await waitFor(this, 'isReady');
  }
  return (await query.call(this,params));

};
module.exports = findDocuments;

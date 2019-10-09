const get = require('../ops/get');
const {waitFor} = require('../../../utils/fn');

async function getDocument(identifier){
  if(!this.isReady){
    await waitFor(this, 'isReady');
  }

  return (await get.call(this,identifier));
};
module.exports = getDocument;

const get = require('../ops/get');

async function getDocument(identifier){
  return (await get.call(this,identifier));

};
module.exports = getDocument;

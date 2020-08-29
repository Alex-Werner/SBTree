const get = require('../ops/get');

async function getDocument(identifier) {
  if (!this.state.isReady) {
    await this.isReady();
  }

  return (await get.call(this, identifier));
}
module.exports = getDocument;

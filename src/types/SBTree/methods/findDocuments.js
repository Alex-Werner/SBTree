const query = require('../ops/query');

async function findDocuments(params) {
  if (!this.state.isReady) {
    await this.isReady();
  }

  return (await query.call(this, params));
}
module.exports = findDocuments;

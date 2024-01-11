import query from '../ops/query.js';

async function findDocuments(params) {
  if (!this.state.isReady) {
    await this.isReady();
  }

  return (query.call(this, params));
}

export default findDocuments;

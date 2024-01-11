import remove from '../ops/remove.js';
async function deleteDocuments(query) {
  if (!query || query === {}) {
    // this would cause to delete all as we would query all.
    throw new Error('Invalid query');
  }
  if (!this.state.isReady) {
    await this.isReady();
  }

  return (await remove.call(this, query));
}

export default deleteDocuments;

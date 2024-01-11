import get from '../ops/get.js';
async function getDocument(identifier) {
  if (!this.state.isReady) {
    await this.isReady();
  }

  return (await get.call(this, identifier));
}
export default getDocument;

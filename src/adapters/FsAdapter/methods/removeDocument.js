async function removeDocument(identifier) {
  if (!identifier) {
    console.error(identifier);
    throw new Error('Cannot remove document, expected id');
  }
  const job = await this.queue.add('File.remove', `${this.path}/d/${identifier}.dat`);
  await job.execution();
}
module.exports = removeDocument;

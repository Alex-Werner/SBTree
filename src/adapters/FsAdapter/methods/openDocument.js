module.exports = async function openDocument(identifer) {
  const job = await this.queue.add('File.read', `${this.path}/d/${identifer}.dat`);
  await job.execution();
  let data = {};
  if (job.results.constructor.name !== Error.name) {
    data = job.results;
  }
  return data;
};

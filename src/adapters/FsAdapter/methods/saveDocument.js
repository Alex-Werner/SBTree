module.exports = async function saveDocument(doc){
  const job = await this.queue.add('File.create', `${this.options.path}/d/${doc._id}.dat`, doc);
  await job.execution();
}

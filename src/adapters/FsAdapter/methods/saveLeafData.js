module.exports = async function saveLeafData(leafName, data) {
  const job = await this.queue.add('File.create', `${this.options.path}/l/${leafName}.dat`,data);
  await job.execution();
  let res = {}
  if(!job.results){
  }
  if (job.results.constructor.name !== Error.name) {
    res = job.results;
  }
  this.lastChange = Date.now();

  return res
}

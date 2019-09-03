const LeafData = require('../types/LeafData/LeafData');
module.exports = async function openLeafData(leafName){
  const job = await this.queue.add('File.read', `${this.options.path}/l/${leafName}.dat`);
  await job.execution();
  let data = {}
  if (job.results.constructor.name !== Error.name) {
    data = job.results;
  }
  this.lastChange = Date.now();

  return data
}

const LeafData = require('../types/LeafData/LeafData');

module.exports = async function openLeafData(leafName) {
  const job = await this.queue.add('File.read', `${this.path}/l/${leafName}.dat`);
  await job.execution();
  let data = {};
  if (job.result.constructor.name !== Error.name) {
    data = job.result;
  }
  this.lastChange = Date.now();

  return data;
};

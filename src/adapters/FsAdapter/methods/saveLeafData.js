module.exports = async function saveLeafData(leafName, data) {
  const job = await this.queue.add('File.create', `${this.path}/l/${leafName}.dat`, data).execution();
  let res = {};
  if (!job.result) {
  }
  if (job.result.constructor.name !== Error.name) {
    res = job.result;
  }
  this.lastChange = Date.now();

  return res;
};

export default async function updateDocument(_doc) {
  const job = await this.queue.add('File.appendJSON', `${this.path}/d/${_doc._id}.dat`, _doc).execution();
  let data = {};
  if (job.result.constructor.name !== Error.name) {
    data = job.result;
  }
  this.lastChange = Date.now();

  return data;
};

module.exports = async function updateDocument(_doc){
    const job = await this.queue.add('File.appendJSON', `${this.options.path}/d/${_doc._id}.dat`, _doc);
    await job.execution();
    let data = {}
    if (job.results.constructor.name !== Error.name) {
        data = job.results;
    }
    this.lastChange = Date.now();

    return data
}

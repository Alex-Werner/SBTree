module.exports = async function saveDatabase(){
  const leafs = JSON.parse(JSON.stringify(this.leafs))
  const tree = this.parent.toJSON();
  const db = {
    leafs,
    tree
  }
  const job = await this.queue.add('File.create', `${this.options.path}/sbtree.meta`, db);
  await job.execution();
  this.lastSave = Date.now();
}

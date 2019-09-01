const File = require('../types/File/File');
module.exports = async function saveDocument(doc){
  await File.create(`${this.options.path}/d/${doc._id}.dat`, doc);
}

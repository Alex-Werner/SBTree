const File = require('../types/File/File');
module.exports = async function openLeafData(identifer){
  const data = await File.read(`${this.options.path}/d/${identifer}.dat`);
  return data
}

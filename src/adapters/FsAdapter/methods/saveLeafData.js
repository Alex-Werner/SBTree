const File = require('../types/File/File');
module.exports = async function saveLeafData(leafName, data) {
  await File.create(`${this.options.path}/l/${leafName}.dat`, data);
  console.log('-created',`${this.options.path}/l/${leafName}.dat` )
  return true;
}

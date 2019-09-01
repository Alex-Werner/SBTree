const File = require('../types/File/File');
const LeafData = require('../types/LeafData/LeafData');
module.exports = async function openLeafData(leafName){
  const data = await File.read(`${this.options.path}/l/${leafName}.dat`);
  return new LeafData(data);
}

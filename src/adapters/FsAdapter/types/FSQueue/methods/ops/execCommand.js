const File = require('../../../File/File');
const Directory = require('../../../Directory/Directory');

module.exports = async function execCommand(command, path, params){
  console.log('exec', command)
  switch (command) {
    case "Directory.create":
      return Directory.create(path);
    case "Directory.exists":
      return Directory.exists(path);
    case "File.create":
      return File.create(path, params);
    case "File.read":
      return File.read(path);
    default:
      throw new Error(`execCommand - Unsupported command ${command}`);
  }
}

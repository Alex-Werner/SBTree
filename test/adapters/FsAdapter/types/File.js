const {expect} = require('chai');
const File = require('../../../../src/adapters/FsAdapter/types/File/File');

describe('File', () => {
  it('should create', async function () {
    const path1 = '.test.db/file1.dat';
    await File.create(path1, {test:true});
    const data = await File.read(path1);
    console.log(data);
    await File.create('.test.db/file1.dat', Object.assign(data,{toto:'ici'}));
    const data2 = await File.read(path1);
    await File.create('.test.db/file1.dat', Object.assign(data2,{remond:'alex@werner.fr'}));
  });

});

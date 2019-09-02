const {expect} = require('chai');
const FSQueue = require('../../../../../src/adapters/FsAdapter/types/FSQueue/FSQueue');

describe('FSQueue', () => {
  let queue;
  it('should initialize', function () {
    queue = new FSQueue()
    expect(queue.queue).to.deep.equal(new Map());
  });
  it('should allow to add new command', function () {
    queue.add('Directory.create','.fsQueue-tests/users');
    queue.add('File.create', '.fsQueue-tests/users/jean.dat', {name:"Jean", age:30});
    queue.add('File.read', '.fsQueue-tests/users/jean.dat')
    queue.add('File.create', '.fsQueue-tests/users/jean.dat', {name:"Jean", age:30});
  });
});

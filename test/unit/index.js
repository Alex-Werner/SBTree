const {expect} = require('chai');
const index = require('../../index');

describe('SBTree', () => {
  it('should work', function () {
    expect(index).to.have.property('SBTree');
    expect(index).to.have.property('ObjectID');
    expect(index).to.have.property('adapters');
    expect(index.adapters).to.have.property('FsAdapter');
    expect(index.adapters).to.have.property('MemoryAdapter');
  });
});

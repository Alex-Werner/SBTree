const {expect} = require('chai');
const indexSpec = require('./index');

describe('SBTree', () => {
  it('should work', function () {
    expect(indexSpec).to.have.property('SBTree');
    expect(indexSpec).to.have.property('ObjectID');
    expect(indexSpec).to.have.property('adapters');
    expect(indexSpec.adapters).to.have.property('FsAdapter');
    expect(indexSpec.adapters).to.have.property('MemoryAdapter');
  });
});

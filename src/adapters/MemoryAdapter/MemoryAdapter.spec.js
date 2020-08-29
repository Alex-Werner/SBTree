const {expect} = require('chai');
const MemoryAdapter = require('./MemoryAdapter');

describe('Adapters - MemoryAdapter', function suite() {
  it('should initialize', function () {
    const adapter = new MemoryAdapter();
    expect(adapter.leafs).to.deep.equal({});
    expect(adapter.documents).to.deep.equal({});
  });
})

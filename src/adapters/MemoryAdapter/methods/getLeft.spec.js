const {expect} = require('chai');
const MemoryAdapter = require('../MemoryAdapter');

describe('Adapters - MemoryAdapter - getLeft', function suite() {
  let adapter;
  const leafId = '16d72f309846d';
  before(async () => {
    adapter = new MemoryAdapter();
    await adapter.createLeaf(leafId);
    await adapter.addInLeaf(leafId, '1234abc', 42);
    await adapter.addInLeaf(leafId, '1234abc2', 42);
    await adapter.addInLeaf(leafId, '1234abc3', -5);
    await adapter.addInLeaf(leafId, '1234abc4', 41);
    await adapter.addInLeaf(leafId, '1234abc5', 0);
    await adapter.addInLeaf(leafId, '1234abc6', 43)
    await adapter.addInLeaf(leafId, '1234abc7', 45)
  })
  it('should be able to get left in leaf', async function () {
    const left = await adapter.getLeftInLeaf(leafId);
    expect(left).to.deep.equal({identifier: '1234abc3', key: -5});
  });

});

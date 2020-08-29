const {expect} = require('chai');
const MemoryAdapter = require('../MemoryAdapter');

describe('Adapters - MemoryAdapter - removeInLeaf', function suite() {
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
  })
  it('should remove a document', async function () {
    expect(await adapter.findInLeaf(leafId, 42, '$eq')).to.deep.equal({
      identifiers: ['1234abc', '1234abc2'],
      keys: [42, 42]
    });
    expect(adapter.leafs[leafId].meta.size).to.be.equal(6);
    const removed = await adapter.removeInLeaf(leafId, '1234abc');
    expect(removed).to.deep.equal([{identifier: '1234abc', index:3}]);
    expect(adapter.leafs[leafId].meta.size).to.be.equal(5);
    const removed2 = await adapter.removeInLeaf(leafId, '1234abc');
    expect(removed2).to.deep.equal([]);
    expect(adapter.leafs[leafId].meta.size).to.be.equal(5);
    await adapter.removeInLeaf(leafId, '1234abc2');
    await adapter.removeInLeaf(leafId, '1234abc3');
    await adapter.removeInLeaf(leafId, '1234abc4');
    await adapter.removeInLeaf(leafId, '1234abc5');
    await adapter.removeInLeaf(leafId, '1234abc6');
    expect(adapter.leafs[leafId].meta.size).to.be.equal(0);
    expect(adapter.leafs[leafId].meta.identifiers).to.deep.equal([])
    expect(adapter.leafs[leafId].data.keys).to.deep.equal([])
  });
})

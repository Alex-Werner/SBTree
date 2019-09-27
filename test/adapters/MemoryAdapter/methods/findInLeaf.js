const {expect} = require('chai');
const MemoryAdapter = require('../../../../src/adapters/MemoryAdapter/MemoryAdapter');

describe('Adapters - MemoryAdapter - findInLeaf', function suite() {
  let adapter;
  const leafId = '16d72f309846d';
  before(async () => {
    adapter = new MemoryAdapter();
    await adapter.createLeaf(leafId);
    await adapter.addInLeaf( leafId, '1234abc', 42);
    await adapter.addInLeaf( leafId, '1234abc2', 42);
    await adapter.addInLeaf( leafId, '1234abc3', -5);
    await adapter.addInLeaf( leafId, '1234abc4', 41);
    await adapter.addInLeaf( leafId, '1234abc5', 0);
    await adapter.addInLeaf( leafId, '1234abc6', 43)
    await adapter.addInLeaf( leafId, '1234abc7', 45)
  })
  it('should $eq find in a leaf', async function () {
    expect(await adapter.findInLeaf(leafId, 42)).to.deep.equal(['1234abc', '1234abc2'])
    expect(await adapter.findInLeaf(leafId, 42, '$eq')).to.deep.equal(['1234abc', '1234abc2'])
  });
  it('should $lte find in a leaf', async function () {
    expect(await adapter.findInLeaf(leafId, 42, '$lte')).to.deep.equal(['1234abc3', '1234abc5', '1234abc', '1234abc2'])
  });
  it('should $lt find in a leaf', async function () {
    expect(await adapter.findInLeaf(leafId, 42, '$lt')).to.deep.equal(['1234abc3', '1234abc5'])
  });
  it('should $gte find in a leaf', async function () {
    expect(await adapter.findInLeaf(leafId, 42, '$gte')).to.deep.equal(['1234abc', '1234abc2', "1234abc6", "1234abc7"])
  });
  it('should $gt find in a leaf', async function () {
    expect(await adapter.findInLeaf(leafId, 42, '$gt')).to.deep.equal(["1234abc6", "1234abc7"])
  });

});
describe('Adapters - MemoryAdapter - findInLeaf', async function () {
  it('should always work', async function () {
    const adapter = new MemoryAdapter();
    const leafId2 = '16d72f309n4me';
    await adapter.createLeaf(leafId2);
    await adapter.addInLeaf(leafId2, '507f191e810c19729de860ea', 'Jean', );
    await adapter.addInLeaf(leafId2,'507c7f79bcf86cd7994f6p4t', 'Patricia', );
    expect(await adapter.findInLeaf(leafId2,'Patricia')).to.deep.equal(['507c7f79bcf86cd7994f6p4t'])
    await adapter.addInLeaf(leafId2, '507f1f77bcf86cd799439011','Alex');
    await adapter.addInLeaf(leafId2,'507c7f79bcf86cd7994f6c0e','Xavier');
    await adapter.addInLeaf(leafId2,'507c7f79bcf86cd7994f6l0l','Lola');
    expect(await adapter.findInLeaf(leafId2,'Patricia')).to.deep.equal(['507c7f79bcf86cd7994f6p4t'])
    await adapter.addInLeaf(leafId2,'507c7f79bcf86cd7994f6p1l','Phillipe');
    await adapter.addInLeaf(leafId2,'507c7f79bcf86cd7994f6D1d','Didier');
    expect(await adapter.findInLeaf(leafId2,'Patricia')).to.deep.equal(['507c7f79bcf86cd7994f6p4t'])
  });
})

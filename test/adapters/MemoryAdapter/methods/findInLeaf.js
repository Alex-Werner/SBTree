const {expect} = require('chai');
const MemoryAdapter = require('../../../../src/adapters/MemoryAdapter/MemoryAdapter');

describe('Adapters - MemoryAdapter - findInLeaf', function suite() {
  let adapter;
  const leafName = 'age';
  before(async () => {
    adapter = new MemoryAdapter();
    await adapter.createLeaf(leafName);
    await adapter.addInLeaf( leafName, '1234abc', 42);
    await adapter.addInLeaf( leafName, '1234abc2', 42);
    await adapter.addInLeaf( leafName, '1234abc3', -5);
    await adapter.addInLeaf( leafName, '1234abc4', 41);
    await adapter.addInLeaf( leafName, '1234abc5', 0);
    await adapter.addInLeaf( leafName, '1234abc6', 43)
    await adapter.addInLeaf( leafName, '1234abc7', 45)
  })
  it('should $eq find in a leaf', async function () {
    expect(await adapter.findInLeaf(leafName, 42)).to.deep.equal(['1234abc', '1234abc2'])
    expect(await adapter.findInLeaf(leafName, 42, '$eq')).to.deep.equal(['1234abc', '1234abc2'])
  });
  it('should $lte find in a leaf', async function () {
    expect(await adapter.findInLeaf(leafName, 42, '$lte')).to.deep.equal(['1234abc3', '1234abc5', '1234abc', '1234abc2'])
  });
  it('should $lt find in a leaf', async function () {
    expect(await adapter.findInLeaf(leafName, 42, '$lt')).to.deep.equal(['1234abc3', '1234abc5'])
  });
  it('should $gte find in a leaf', async function () {
    expect(await adapter.findInLeaf(leafName, 42, '$gte')).to.deep.equal(['1234abc', '1234abc2', "1234abc6", "1234abc7"])
  });
  it('should $gt find in a leaf', async function () {
    expect(await adapter.findInLeaf(leafName, 42, '$gt')).to.deep.equal(["1234abc6", "1234abc7"])
  });

});
describe('Adapters - MemoryAdapter - findInLeaf - special cases', async function () {

  it('should work', async function () {
    const adapter = new MemoryAdapter();
    const leafName2 = 'name';
    await adapter.createLeaf(leafName2);
    await adapter.addInLeaf(leafName2, 'Jean', '507f191e810c19729de860ea');
    await adapter.addInLeaf(leafName2,'Alex', '507f1f77bcf86cd799439011');
    await adapter.addInLeaf(leafName2,'Xavier', '507c7f79bcf86cd7994f6c0e');
    await adapter.addInLeaf(leafName2,'Patricia', '507c7f79bcf86cd7994f6p4t');
    await adapter.addInLeaf(leafName2,'Lola', '507c7f79bcf86cd7994f6l0l');

  });
})

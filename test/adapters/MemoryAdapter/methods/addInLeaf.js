const {expect} = require('chai');
const MemoryAdapter = require('../../../../src/adapters/MemoryAdapter/MemoryAdapter');

describe('Adapters - MemoryAdapter - addInLeaf', function suite() {
  let adapter;
  const leafName = 'age';
  const unexistingLeafName = 'email';
  before(() => {
    adapter = new MemoryAdapter();
    adapter.createLeaf(leafName);
  })
  it('should add in a leaf', async function () {
   await adapter.addInLeaf(leafName, leafName, '1234abc', 42);
   expect(adapter.leafs.age.meta.size).to.equal(1);
   expect(adapter.leafs.age.meta.identifiers).to.deep.equal(['1234abc']);
   expect(adapter.leafs.age.data.keys).to.deep.equal([42]);
  });
  it('should add similar value if identifier is different', async function () {
    await adapter.addInLeaf(leafName, leafName, '1234abc2', 42);
    expect(adapter.leafs.age.meta.size).to.equal(2);
    expect(adapter.leafs.age.meta.identifiers).to.deep.equal(['1234abc', '1234abc2']);
    expect(adapter.leafs.age.data.keys).to.deep.equal([42, 42]);
  });
  it('should not add similar value if identifier is similar', async function () {
    await adapter.addInLeaf(leafName, leafName, '1234abc2', 0);
    expect(adapter.leafs.age.meta.size).to.equal(2);
    expect(adapter.leafs.age.meta.identifiers).to.deep.equal(['1234abc', '1234abc2']);
    expect(adapter.leafs.age.data.keys).to.deep.equal([42, 42]);
  });
  it('should insert sorted', async function () {
    await adapter.addInLeaf(leafName, leafName, '1234abc3', -5);
    await adapter.addInLeaf(leafName, leafName, '1234abc4', 41);
    await adapter.addInLeaf(leafName, leafName, '1234abc5', 0);
    await adapter.addInLeaf(leafName, leafName, '1234abc6', 43)

    expect(adapter.leafs.age.meta.size).to.equal(6);
    expect(adapter.leafs.age.meta.identifiers).to.deep.equal(['1234abc3', '1234abc5', '1234abc4', '1234abc', '1234abc2', '1234abc6']);
    expect(adapter.leafs.age.data.keys).to.deep.equal([-5, 0, 41, 42, 42, 43]);
  });
  it('should create leaf if not exist', async function () {
    await adapter.addInLeaf(unexistingLeafName, unexistingLeafName, '1234abc', 'test@gmail.com' )
    expect(adapter.leafs.email.meta.size).to.equal(1);
    expect(adapter.leafs.email.meta.identifiers).to.deep.equal(['1234abc']);
    expect(adapter.leafs.email.data.keys).to.deep.equal(['test@gmail.com']);
  });
});

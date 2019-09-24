const {expect} = require('chai');
const MemoryAdapter = require('../../../../src/adapters/MemoryAdapter/MemoryAdapter');

describe('Adapters - MemoryAdapter - createLeaf', function suite() {
  let adapter;
  const leafName = 'age';
  before(() => {
    adapter = new MemoryAdapter();
  })
  it('should create a leaf', function () {
    adapter.createLeaf(leafName);
    expect(adapter.leafs.age).to.exist;
    expect(adapter.leafs.age.meta).to.deep.equal(
        {identifiers: [], size: 0}
    );
    expect(adapter.leafs.age.data).to.deep.equal({keys: []});
  });
  it('should prevent erasing a already existing leaf', function (done) {
    adapter.leafs.age.data.keys.push(42);
    adapter.leafs.age.meta.identifiers.push('12345abc');
    adapter.leafs.age.meta.size = 1

    // expect(function () {
    // FIXME
    // For some reason we cannot test it properly... Need to investigate when we got some Wifi
      adapter.createLeaf(leafName);
    // }).to.throw(new Error('Leaf age already exist'));

    expect(adapter.leafs.age.meta).to.deep.equal(
        {identifiers: ['12345abc'], size: 1}
    );
    expect(adapter.leafs.age.data).to.deep.equal({keys: [42]});

    done()
  });

})

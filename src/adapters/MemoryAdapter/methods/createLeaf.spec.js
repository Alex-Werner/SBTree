import { expect } from 'chai';
const MemoryAdapter = require('../MemoryAdapter');
const {expectThrowsAsync} = require('../../../../test/test.utils');

describe('Adapters - MemoryAdapter - createLeaf', function suite() {
  let adapter;
  const leafId = '16d72f309846d';
  before(() => {
    adapter = new MemoryAdapter();
  })
  it('should create a leaf', function () {
    adapter.createLeaf(leafId);
    expect(adapter.leafs[leafId]).to.exist;
    expect(adapter.leafs[leafId].meta).to.deep.equal(
        {identifiers: [], size: 0}
    );
    expect(adapter.leafs[leafId].data).to.deep.equal({keys: []});
  });
  it('should prevent erasing a already existing leaf', function (done) {
    adapter.leafs[leafId].data.keys.push(42);
    adapter.leafs[leafId].meta.identifiers.push('12345abc');
    adapter.leafs[leafId].meta.size = 1

    expectThrowsAsync(()=>adapter.createLeaf(leafId), `Leaf ${leafId} already exist.`);

    expect(adapter.leafs[leafId].meta).to.deep.equal(
        {identifiers: ['12345abc'], size: 1}
    );
    expect(adapter.leafs[leafId].data).to.deep.equal({keys: [42]});

    done()
  });

})

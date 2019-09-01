const {expect} = require('chai');
const SBFLeaf = require('../../../src/types/SBFLeaf/SBFLeaf');
const MemoryAdpter = require('../../../src/adapters/MemoryAdapter');
const adapter = new MemoryAdpter()

const fakeTree = {
  options: {order: 3},
  adapter,
  refKey: null
}
const fakeParent = {};
fakeParent.getAdapter = () => {
  return fakeParent.getTree().adapter;
};
fakeParent.getTree = () => {
  return fakeTree
}
fakeParent.getTreeOptions = () => {
  return fakeParent.getTree().options
}
fakeParent.insertReferenceKey = (key) => {
  fakeTree.refKey = key
}
fakeParent.attachLeaf = () => {
}


const fakeParent2 = {a: 1};
const fakeParent3 = {v: 2};
describe('SBFLeaf', () => {
  let sharedLeaf;
  it('should initialize', function () {
    sharedLeaf = new SBFLeaf({parent: fakeParent})
    expect(sharedLeaf.name.length).to.equal(13)
  });
  it('should get parent', function () {
    const leaf = new SBFLeaf({parent: fakeParent2})
    expect(leaf.getParent()).to.equal(fakeParent2)
  });
  it('should set parent', function () {
    const leaf = new SBFLeaf({parent: fakeParent2})
    leaf.setParent(fakeParent3)
    expect(leaf.getParent()).to.equal(fakeParent3)
  });
  it('should insert', async function () {
    await sharedLeaf.insert('Jean', '507f191e810c19729de860ea');

    expect(Object.keys(fakeTree.adapter.leafs).length).to.equal(1);
    expect(fakeTree.adapter.leafs[Object.keys(fakeTree.adapter.leafs)]).to.deep.equal({
      data: {
        keys: [
          'Jean'
        ]
      },
      meta: {
        identifiers: ['507f191e810c19729de860ea'],
        size: 1
      }
    });

    await sharedLeaf.insert('Alex', '507f1f77bcf86cd799439011');

    expect(fakeTree.adapter.leafs[Object.keys(fakeTree.adapter.leafs)]).to.deep.equal({
      data: {
        keys: [
          'Alex',
          'Jean',
        ]
      },
      meta: {
        identifiers: ['507f1f77bcf86cd799439011', '507f191e810c19729de860ea'],
        size: 2
      }
    });
    await sharedLeaf.insert('Xavier', '507c7f79bcf86cd7994f6c0e');
    expect(fakeTree.refKey).to.equal('Jean');
    expect(Object.keys(fakeTree.adapter.leafs).length).to.equal(2);
    expect(fakeTree.adapter.leafs[Object.keys(fakeTree.adapter.leafs)[0]]).to.deep.equal({
      data: {
        keys: [
          'Alex',
        ]
      },
      meta: {
        identifiers: ['507f1f77bcf86cd799439011'],
        size: 1
      }
    });
    expect(fakeTree.adapter.leafs[Object.keys(fakeTree.adapter.leafs)[1]]).to.deep.equal({
      data: {
        keys: [
          'Jean', 'Xavier'
        ]
      },
      meta: {
        identifiers: ['507f191e810c19729de860ea', '507c7f79bcf86cd7994f6c0e'],
        size: 2
      }
    });
  });
});

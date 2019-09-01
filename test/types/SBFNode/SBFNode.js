const {expect} = require('chai');
const SBFNode = require('../../../src/types/SBFNode/SBFNode');
const SBFLeaf = require('../../../src/types/SBFLeaf/SBFLeaf');
const MemoryAdpter = require('../../../src/adapters/MemoryAdapter/MemoryAdapter');
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
  let sharedNode;
  it('should initialize', function () {
    sharedNode = new SBFNode({parent: fakeParent})
    expect(sharedNode.keys).to.deep.equal([])
    expect(sharedNode.childrens).to.deep.equal([])
  });
  it('should get parent', function () {
    const leaf = new SBFNode({parent: fakeParent2})
    expect(leaf.getParent()).to.equal(fakeParent2)
  });
  it('should set parent', function () {
    const leaf = new SBFNode({parent: fakeParent2})
    leaf.setParent(fakeParent3)
    expect(leaf.getParent()).to.equal(fakeParent3)
  });
  it('should insert', async function () {
    const leaf = new SBFLeaf({parent:sharedNode})
    // Hack because of Error: SBFNode cannot insert with no childrens
    await leaf.insert('Jean','507f191e810c19729de860ea')
    await leaf.insert('Alex','507f1f77bcf86cd799439011')
    sharedNode.childrens = [leaf];
    expect(Object.keys(fakeTree.adapter.leafs).length).to.equal(1);

    await sharedNode.insert('Jean', '507f191e810c19729de860ea');
    expect(Object.keys(fakeTree.adapter.leafs).length).to.equal(2);
    expect(sharedNode.keys).to.deep.equal(['Jean']);
  });
});

import { expect } from 'chai';
import SBFNode from './SBFNode.js';
import MemoryAdapter from '../../adapters/MemoryAdapter/MemoryAdapter.js';
const adapter = new MemoryAdapter();

const fakeTree = {
  order: 3,
  fillFactor:0.5,
  adapter,
  getOptions: () =>{
    return {order:fakeTree.order, fillFactor:fakeTree.fillFactor}
  },
  getAdapter:()=> adapter
}
const fakeParent = {
  fieldName: 'firstname',
};
fakeParent.getAdapter = () => {
  return fakeParent.getTree().adapter;
};
fakeParent.getTree = () => {
  return fakeTree
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
    // const node = new SBFNode({parent:sharedNode})
    // Hack because of Error: SBFNode cannot insert with no childrens
    await sharedNode.insert('507f191e810c19729de860ea','Jean')
    await sharedNode.insert('507f1f77bcf86cd799439011','Alex')
    // sharedNode.childrens = [leaf];
    expect(Object.keys(fakeTree.adapter.leafs).length).to.equal(1);

    //FIXME : here, we have a split, so further tests should be done to ensure it.
    await sharedNode.insert('507f191e810c19729de860eb','Jean');
    expect(Object.keys(fakeTree.adapter.leafs).length).to.equal(2);
    // expect(sharedNode.keys).to.deep.equal(['Jean']);
  });
  it('should find', async function () {
    const find = await sharedNode.find('Alex');
    expect(find).to.deep.equal({identifiers:['507f1f77bcf86cd799439011'], keys:['Alex']})
  });
});

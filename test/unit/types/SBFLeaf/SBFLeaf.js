const {expect} = require('chai');
const SBFLeaf = require('../../../../src/types/SBFLeaf/SBFLeaf');
const MemoryAdpter = require('../../../../src/adapters/MemoryAdapter/MemoryAdapter');
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
    expect(sharedLeaf.id.length).to.equal(13)
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
    await sharedLeaf.insert('507f191e810c19729de860ea','Jean' );

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

    await sharedLeaf.insert('507f1f77bcf86cd799439011','Alex');
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
    await sharedLeaf.insert('507c7f79bcf86cd7994f6c0e','Xavier');

    console.log('\n\n\n')
    console.log(sharedLeaf)

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
  it('should find', async function () {
    await sharedLeaf.insert('507c7f79bcf86cd7994f6p4t','Patricia');
    console.log('/inserted patricia')
    await sharedLeaf.insert('507c7f79bcf86cd7994f6l0l','Lola');
    const find = await sharedLeaf.find('Patricia');
    console.log(sharedLeaf.getParent().getTree().adapter.leafs[sharedLeaf.name])
    console.log({sharedLeaf})
    console.log(find)
    // const find2 = await sharedLeaf.find('Lola');
    expect(find).to.deep.equal(['507c7f79bcf86cd7994f6p4t']);
    // expect(find2).to.deep.equal(['507c7f79bcf86cd7994f6l0l']);
  });
  // it('should remove', async function () {
  //   const find = await sharedLeaf.find('Patricia');
  //   expect(find).to.deep.equal(['507c7f79bcf86cd7994f6p4t'])
  //
  //   await sharedLeaf.remove('507c7f79bcf86cd7994f6p4t');
  //
  //   const find2 = await sharedLeaf.find('Patricia');
  //   console.log(find2)
  //   expect(find2).to.deep.equal(['507c7f79bcf86cd7994f6p4t'])
  //
  // });
  // it('should find and remove', async function () {
  //   // await
  // });
});

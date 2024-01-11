import { expect } from 'chai';
const SBFLeaf = require('./SBFLeaf');
const MemoryAdpter = require('../../adapters/MemoryAdapter/MemoryAdapter');
const adapter = new MemoryAdpter()

const fakeTree = {
  options: {order: 3},
  adapter,
  root:{
    keys:[],
    identifiers:[],
    childrens:[]
  }
}
const fakeParent = {
  fieldName: 'name',
  childrens:[],
  keys:[]
};
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
  fakeTree.root.keys.push(key)
}
fakeParent.attachLeaf = (index, leaf) => {
  fakeTree.root.childrens.splice(index,0,leaf);
}


const fakeParent2 = {a: 1};
const fakeParent3 = {v: 2};
describe('SBFLeaf', () => {
  let sharedLeaf;
  it('should initialize', function () {
    sharedLeaf = new SBFLeaf({parent: fakeParent})
    expect(sharedLeaf.id.length).to.equal(20)
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

    expect(fakeTree.root.keys).to.deep.equal(['Jean']);
    // expect(Object.keys(fakeTree.root.keys).length).to.equal(2);
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

    const find = await sharedLeaf.find('Patricia');
    expect(find).to.deep.equal({identifiers:['507c7f79bcf86cd7994f6p4t'], keys:['Patricia']});

    await sharedLeaf.insert('507c7f79bcf86cd7994f6l0l','Lola');
    // A split happened here
    const anotherLeaf = sharedLeaf.getParent().getTree().root.childrens[0];

    const find0fail = await sharedLeaf.find('Patricia');
    expect(find0fail).to.deep.equal({identifiers:[], keys:[]});

    const find0 = await anotherLeaf.find('Patricia');
    expect(find0).to.deep.equal({identifiers:['507c7f79bcf86cd7994f6p4t'], keys:['Patricia']});

    const find1 = await sharedLeaf.find('Alex');
    expect(find1).to.deep.equal({identifiers:['507f1f77bcf86cd799439011'], keys:['Alex']});

    const find2fail = await sharedLeaf.find('Lola');
    expect(find2fail).to.deep.equal({identifiers:[], keys:[]});

    const find2 = await anotherLeaf.find('Lola');
    expect(find2).to.deep.equal({identifiers:['507c7f79bcf86cd7994f6l0l'], keys:['Lola']});
  });
  it('should remove', async function () {
    const anotherLeaf = sharedLeaf.getParent().getTree().root.childrens[0];

    const find = await anotherLeaf.find('Patricia');
    expect(find).to.deep.equal({identifiers:['507c7f79bcf86cd7994f6p4t'], keys:['Patricia']})

    await anotherLeaf.remove({_id:'507c7f79bcf86cd7994f6p4t'});

    const find2 = await anotherLeaf.find('Patricia');
    expect(find2).to.deep.equal({identifiers:[], keys:[]})

  });
});

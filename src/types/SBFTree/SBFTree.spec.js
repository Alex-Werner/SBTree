const {expect} = require('chai');
const SBFTree = require('../SBFTree/SBFTree');
const MemoryAdapter = require('../../adapters/MemoryAdapter/MemoryAdapter')
// Vector for verifying with a visual tool : https://www.cs.csubak.edu/~msarr/visualizations/BPlusTree.html
describe('SBFTree', () => {
  let tree;
  let adapter = new MemoryAdapter()
  it('should failed without any field name ', function () {
    expect(() => {
      tree = new SBFTree({order: 3})
    }).to.throw('SBFTree expect a fieldName to be initialized')
  });
  it('should default on mem adapter + size', function () {
    const t = new SBFTree({adapter, fieldName: 'email'});
    expect(t.order).to.equal(511)
    console.log(t)
    expect(t.getAdapter().constructor.name).to.equal('MemoryAdapter')
  });
  it('should instantiate', async function () {
    tree = new SBFTree({adapter, fieldName: 'age', order: 3});
    expect(tree.order).to.equal(3)
    expect(tree.fieldName).to.equal('age')

    await tree.insert('5d675592aa2c1a52a0eeaa46', 40);
    await tree.insert('5d6755b71f9edbc997c8d156', 60);
    await tree.insert('5d6755bba792f16bdb3eab7b', 70);
    await tree.insert('5d67592851b41056838b7232', 80);
    await tree.insert('5d67599b94f1fcc963071138', 30);
    await tree.insert('5d6759cd1d493a7fdcb0c43a', 0);
    await tree.insert('5d6761b785c340115a93e87f', 90);
    await tree.insert('5d6761b785c340115a9dd88f', 50);
    await tree.insert('5d6761b785c340115a9dd89f', 20);
    await tree.insert('5d6761b785c340115a9dd10f', 10);

    expect(tree.root.keys).to.deep.equal([30, 60]);
    expect(Object.keys(tree.root.childrens).length).to.deep.equal(3);

    expect(tree.root.childrens[0].keys).to.deep.equal([10]);
    expect(Object.keys(tree.root.childrens[0].childrens).length).to.deep.equal(2);

    const leafs = tree.getAdapter().leafs;
    const bucket1Id = tree.root.childrens[0].childrens[0].id;
    expect(leafs[bucket1Id].data.keys).to.deep.equal([0]);

    const bucket2Id = tree.root.childrens[0].childrens[1].id;
    expect(leafs[bucket2Id].data.keys).to.deep.equal([10, 20]);

    expect(tree.root.childrens[1].keys).to.deep.equal([40]);
    expect(Object.keys(tree.root.childrens[1].childrens).length).to.deep.equal(2);

    const bucket3Id = tree.root.childrens[1].childrens[0].id;
    expect(leafs[bucket3Id].data.keys).to.deep.equal([30]);

    const bucket4Id = tree.root.childrens[1].childrens[1].id;
    expect(leafs[bucket4Id].data.keys).to.deep.equal([40, 50]);

    expect(tree.root.childrens[2].keys).to.deep.equal([70, 80]);
    expect(Object.keys(tree.root.childrens[2].childrens).length).to.deep.equal(3);

    const bucket5Id = tree.root.childrens[2].childrens[0].id;
    expect(leafs[bucket5Id].data.keys).to.deep.equal([60]);

    const bucket6Id = tree.root.childrens[2].childrens[1].id;
    expect(leafs[bucket6Id].data.keys).to.deep.equal([70]);

    const bucket7Id = tree.root.childrens[2].childrens[2].id;
    expect(leafs[bucket7Id].data.keys).to.deep.equal([80, 90]);

    await tree.insert(85, '507f191e810c19729de860ea');
    expect(tree.root.keys).to.deep.equal([60]);

    expect(tree.root.childrens[0].keys).to.deep.equal([30]);
    expect(tree.root.childrens[0].childrens[0].keys).to.deep.equal([10]);
    expect(tree.root.childrens[0].childrens[1].keys).to.deep.equal([40]);
    expect(tree.root.childrens[1].keys).to.deep.equal([80]);

    expect(tree.root.childrens[1].childrens[0].keys).to.deep.equal([70]);
    expect(tree.root.childrens[1].childrens[1].keys).to.deep.equal([80]);
  });
});

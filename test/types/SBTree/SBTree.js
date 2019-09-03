const {expect} = require('chai');
const SBTree = require('../../../src/types/SBTree/SBTree');
const fixtures = {
  documents:[
    {age:27,email:'alex@valjean.fr', _id:'16ced004da93e'},
    {age:33, email:'alain@dourak.ru', _id:'16ced00ee7931'},
    {age:33, email:'basil@valjean.fr', _id:'16ced00ce6a31'},
    {age:42, email:'jean@valjean.fr'}
  ]
};

describe('SBTree', () => {
  let tree;

  it('should instantiate', async function () {
    tree = new SBTree({order:3, verbose:true});
    expect(tree.options.order).to.equal(3)
    expect(tree.fieldTrees).to.deep.equal({});
    expect(tree.size).to.equal(0);
  });
  it('should correctly default', function () {
    const t = new SBTree();
    expect(t.options.order).to.equal(511)
    expect(tree.fieldTrees).to.deep.equal({});
    expect(tree.size).to.equal(0);

  });
  it('should insert a document',async function () {
    const inserted = await tree.insertDocuments(fixtures.documents[0]);
    expect(tree.size).to.equal(1);
    expect(Object.keys(tree.fieldTrees).length).to.equal(2);
    expect(tree.fieldTrees['age'].field).to.equal('age')
    expect(tree.fieldTrees['age'].options).to.deep.equal({
      order:3,
      verbose:true
    });

    expect(Object.keys(tree.fieldTrees['age'].root.keys)).to.deep.equal([]);
    expect(Object.keys(tree.fieldTrees['age'].root.childrens).length).to.deep.equal(1);
  })
  it('should insert and split', async function () {
      await tree.insertDocuments(fixtures.documents[1]);
      await tree.insertDocuments(fixtures.documents[2]);
  });
  it('should find ', async function (){
    const docs = await tree.findDocuments({email:'alex@valjean.fr'});
    expect(docs).to.deep.equal([{"_id":"16ced004da93e","age":27,"email":"alex@valjean.fr"}])

    const docs2 = await tree.findDocuments({age:45});
    expect(docs2).to.deep.equal([])

    const docs3 = await tree.findDocuments({age:27});
    expect(docs3).to.deep.equal([{"_id":"16ced004da93e","age":27,"email":"alex@valjean.fr"}])

    const docs4 = await tree.findDocuments({age:33});
    expect(docs4).to.deep.equal([{"_id":"16ced00ee7931","age":33,"email":"alain@dourak.ru"},{"_id":"16ced00ce6a31","age":33,"email":"basil@valjean.fr"}])
  })

  it('should get a document from a id', async function () {
    const doc = await tree.getDocument('16ced00ee7931');
    expect(doc).to.deep.equal({"_id":"16ced00ee7931","age":33,"email":"alain@dourak.ru"})
  });
  it('should create a id on a document if not yet present', async function () {
    const inserted = await tree.insertDocuments(fixtures.documents[3]);
    const {_id} = inserted;
    const doc = await tree.getDocument(_id);
    const doc2 = await tree.findDocuments({_id});
    const doc3 = await tree.findDocuments({email:fixtures.documents[3].email});

    expect(doc).to.deep.equal(Object.assign({},{_id},fixtures.documents[3] ))
    expect(doc3).to.deep.equal([Object.assign({},{_id},fixtures.documents[3] )])
    expect(doc2).to.deep.equal([Object.assign({},{_id},fixtures.documents[3] )])
  });
});

const {expect} = require('chai');
const SBTree = require('./SBTree');
const fixtures = {
  documents: [
    {age: 27, email: 'alex@valjean.fr', _id: '16ced004da93e'},
    {age: 33, email: 'alain@dourak.ru', _id: '16ced00ee7931'},
    {age: 33, email: 'basil@valjean.fr', _id: '16ced00ce6a31'},
    {age: 42, email: 'jean@valjean.fr'}
  ]
};

describe('SBTree', () => {
  let tree;
  it('should instantiate', async function () {
    tree = new SBTree({order:3, verbose:true});
    expect(tree.order).to.equal(3)
    expect(tree.fieldTrees).to.deep.equal({});
    expect(tree.size).to.equal(0);
  });
  it('should provide isReady ', async function () {
    const treeNeedReadiness = new SBTree({adapter: {name:'FsAdapter'}});
    expect(treeNeedReadiness.state.isReady).to.equal(false);
    await treeNeedReadiness.isReady();
    expect(treeNeedReadiness.state.isReady).to.equal(true);

    // Both of these are done to release any interval working
    treeNeedReadiness.adapter.autoSave = false;
    treeNeedReadiness.adapter.queue.stop();
  });
  return;
  it('should correctly default', function () {
    const t = new SBTree();
    expect(t.order).to.equal(511)
    expect(tree.fieldTrees).to.deep.equal({});
    expect(tree.size).to.equal(0);

  });
  it('should insert a document',async function () {
    const inserted = await tree.insertDocuments(fixtures.documents[0]);
    expect(tree.size).to.equal(1);
    expect(Object.keys(tree.fieldTrees).length).to.equal(2);
    expect(tree.fieldTrees['age'].fieldName).to.equal('age')
    expect(tree.fieldTrees['age'].order).to.equal(3);
    expect(tree.fieldTrees['age'].verbose).to.equal(true);

    expect(tree.fieldTrees['age'].root.keys).to.deep.equal([27]);
    expect(Object.keys(tree.fieldTrees['age'].root.identifiers)).to.deep.equal(['0']);
    expect(Object.keys(tree.fieldTrees['age'].root.childrens).length).to.deep.equal(0);
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
  it('should deal with nested documents', async function () {
    // FIXME
    // const inserted = await tree.insertDocuments({"_id":"16ced00ee7932","age":55,"email":"patrick@dourak.ru", rapports:[{date:'2019-01-01', title:"Started reporting", diffusion:{releasePublicDate:'2050-01-01'} }]});
  })
  describe('Queries', ()=>{
    it('should handle strict equality', async function () {
      const doc = await tree.findDocuments({age:33});
      expect(doc).to.be.deep.equal([ { age: 33, email: 'alain@dourak.ru', _id: '16ced00ee7931' } ]);

      const doc2 = await tree.findDocuments({$eq:{age:33}});
      expect(doc2).to.be.deep.equal([]);
    });
  })

  describe('Unique field', () => {
    it('should work', async function () {
      const uniqueTree = new SBTree({order: 3, verbose: true, uniques: ['email']});
      expect(uniqueTree.uniques).to.be.deep.equal(['email']);

      const realJean = {email: 'jean@valjean.fr', pseudo: 'realJean'};
      const inserted = await uniqueTree.insertDocuments(realJean);
      const insertedDuplicateKey = await uniqueTree.insertDocuments({email: 'jean@valjean.fr', pseudo: 'fakeJean'});
      expect(Object.assign({}, {email: inserted.email, pseudo: inserted.pseudo})).to.deep.equal(realJean);
      // expect(Object.assign({}, {
      //   email: insertedDuplicateKey.email,
      //   pseudo: insertedDuplicateKey.pseudo
      // })).to.deep.equal(realJean);
      const findingRes = (await uniqueTree.findDocuments({email: 'jean@valjean.fr'}))
      console.log(findingRes)
      expect(findingRes.length).to.deep.equal(1);
      expect(findingRes[0].email).to.deep.equal(realJean.email);
      expect(findingRes[0].name).to.deep.equal(realJean.name);
    });
  })
  describe('Excluded fields', () => {
    it('should work', async function () {
      const excludeTree = new SBTree({order: 3, verbose: true, exclude: ['nestedField']});
      expect(excludeTree.exclude).to.be.deep.equal(['nestedField']);

      const user1 = {email: 'jean@valjean.fr', pseudo: 'realJean', nestedField: {address: {country: 'France'}}};
      const inserted = await excludeTree.insertDocuments(user1);

      const findingRes = (await excludeTree.findDocuments({email: 'jean@valjean.fr'}))
      expect(findingRes.length).to.deep.equal(1);
      expect(findingRes[0].email).to.deep.equal(user1.email);
      expect(findingRes[0].name).to.deep.equal(user1.name);
      expect(findingRes[0].nestedField).to.deep.equal(user1.nestedField);

      expect(Object.keys(excludeTree.fieldTrees)).to.be.deep.equal(['email', 'pseudo']);

      const tryingToFingInExclude = (await excludeTree.findDocuments({nestedField: user1.nestedField}));
      expect(tryingToFingInExclude).to.be.deep.equal([]);
    });
  })
});

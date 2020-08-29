const {expect} = require('chai');
const {SBTree} = require('../..');
const users = require('./users');

const toNames = (arr)=>{
  return arr.reduce((acc, el)=>{
      acc.push(el.name);
      return acc
    },[]);
}
describe('E2E - UseCase nested document', function suite() {
  let ts = 1589885726633;
  const customTree = new SBTree({order: 40});
  const doc = {
    id: 'KqXIhr',
    key: 'KqXIhr',
    value: {
      _id: 'KqXIhr',
      _rev: '1-85e8ff864ae6d157217ad2e4d4117f5e',
    },
    _created: ts,
    _updated: ts,
    _id: '5ec3bb1e299eb9b64166ebbb'
  };
  let doc2;
  describe('Nested document', async () => {
    it('should insert a simgle document', async function () {
      await customTree.insertDocuments(doc);
    });
    it('should get the document', async function () {
      const getDocRes = await customTree.getDocument(doc._id);
      expect(getDocRes).to.deep.equal(doc);
    });
    it('should find the document', async function () {
      const findDocRes = await customTree.findDocuments({key: 'KqXIhr'});
      expect(findDocRes[0]).to.deep.equal(doc);
      const findDocRes2 = await customTree.findDocuments({_created: {$lte: doc._created+1000}});
      expect(findDocRes2[0]).to.deep.equal(doc);
    });
    it.skip('should update', function () {
    });
    it('should replace', async function (){
      doc2 = {...doc, _updated: doc._updated+1000};
      doc2.value._count = 1;

      const replaceDocRes = await customTree.replaceDocuments(doc2)
      expect(replaceDocRes[0]).to.deep.equal(doc2);
      const getDocRes = await customTree.getDocument(doc._id);
      expect(getDocRes).to.deep.equal(doc2);
    })
    it('should delete the document', async function () {
      const delDocRes = await customTree.deleteDocuments({_created: {$gte: doc._updated}});
      expect(delDocRes[0]).to.deep.equal(doc2);
      const getDocRes = await customTree.getDocument(doc._id);
      expect(getDocRes).to.deep.equal(null);
    });
  });
});

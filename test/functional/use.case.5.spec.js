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
    ts,
    _id: '5ec3bb1e299eb9b64166ebbb'
  };
  describe('Nested document', async () => {
    it('should insert a simgle document', async function () {
      await customTree.insertDocuments(doc);
      console.dir(customTree, {depth: 8});
    });
    it('should get the document', async function () {
      const getDocRes = await customTree.getDocument(doc._id);
      expect(getDocRes).to.deep.equal(doc);
    });
    it('should find the document', async function () {
      const findDocRes = await customTree.findDocuments({key: 'KqXIhr'});
      expect(findDocRes[0]).to.deep.equal(doc);
      const findDocRes2 = await customTree.findDocuments({ts: {$lte: ts+1000}});
      expect(findDocRes2[0]).to.deep.equal(doc);
    });
    it('should update', function () {

    });
    it('should replace', async function (){

    })
    it('should delete the document', async function () {
      const delDocRes = await customTree.deleteDocuments({ts: {$lte: ts+1000}});
      console.log({delDocRes});
      const getDocRes = await customTree.getDocument(doc._id);
      console.dir({getDocRes});
      expect(getDocRes).to.deep.equal(null);

    });
  });
});

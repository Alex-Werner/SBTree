import {expect} from 'chai';
import {SBTree} from '../../index.js';
import users from './users.json' assert { type: "json" };

const toNames = (arr)=>{
  return arr.reduce((acc, el)=>{
      acc.push(el.name);
      return acc
    },[]);
}
describe('E2E - UseCase with lower fill factor than order', function suite() {
  let ts = 1588913801357;
  describe('RegUser DB', async () => {
    const customTree = new SBTree({order:40});
    const doc =  {
     _id: '754aeea7c0919797d6eb2710d200eafd',
     key: 'VATEmq',
     value: 4,
     ts
   };

    it('should insert', async function () {
      await customTree.insertDocuments(doc);
    });
    it('should get document', async function () {
      const res = await customTree.getDocument('754aeea7c0919797d6eb2710d200eafd')
      expect(res).to.deep.equal(doc);
    });
    it('should be able to search the document', async function () {
      const found = await customTree.findDocuments({ts});
      expect(found).to.deep.equal([doc]);

      const foundLowerThanEq = await customTree.findDocuments({ts:{$lte: ts}});
      expect(foundLowerThanEq).to.deep.equal([doc]);

      const foundLowerThanEq1 = await customTree.findDocuments({ts:{$lte: ts+1000}});
      expect(foundLowerThanEq1).to.deep.equal([doc]);

      const foundGreaterThanEq = await customTree.findDocuments({ts:{$gte: ts}});
      expect(foundGreaterThanEq).to.deep.equal([doc]);

      const foundGreaterThanEq1 = await customTree.findDocuments({ts:{$gte: ts-1000}});
      expect(foundGreaterThanEq1).to.deep.equal([doc]);

      const foundEq = await customTree.findDocuments({ts:{$eq: ts}});
      expect(foundEq).to.deep.equal([doc]);
    });
    it('should be able to delete the document', async function () {
      const deleted = await customTree.deleteDocuments({ts: {$lte: ts+1}});
      expect(deleted).to.deep.equal([doc]);

      const found = await customTree.findDocuments({ts});
      expect(found).to.deep.equal([]);

      const res = await customTree.getDocument('754aeea7c0919797d6eb2710d200eafd')
      expect(res).to.deep.equal(null);
    });
  });
})

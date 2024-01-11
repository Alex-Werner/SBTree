import { expect } from 'chai';
import { SBTree } from '../../index.js';

describe('E2E - Classic UseCase', function suite() {
  describe('RegUser DB', () => {
    const customTree = new SBTree({
      order: 3,
    });
    const alex = {
      _id: "5d9d74a2668f032206e4dc01",
      name:"Alex",
      infos:{
        job:{
          sector: "IT"
        }
      }
    };
    it('should allow to insert documents with basic nested support', async function () {
      await customTree.insertDocuments(alex);
    });
    it('should allow to find the document', async function () {
      const doc = await customTree.findDocuments({name:"Alex"});
      expect(doc).to.deep.equal([alex])
    });
    it('should be able to find document on nested',async function () {
      const doc = await customTree.findDocuments({infos:{job:{sector:"IT"}}});
      expect(doc).to.deep.equal([alex]);
    });
  });
})

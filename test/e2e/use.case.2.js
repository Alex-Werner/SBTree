const {expect} = require('chai');
const {SBTree} = require('../..');
const {draw}= require('../../src/utils/ascii');
describe('E2E - Classic UseCase', function suite() {
  describe('RegUser DB', () => {
    const shiftedUsers = [];
    const tree = new SBTree();
    const customTree = new SBTree({
      order: 3,
    });

    it('should allow to insert documents with basic nested support', async function () {
      const doc = {
        name:"Alex",
        infos:{
          job:{
            sector: "IT"
          }
        }
      };
      await customTree.insertDocuments(doc);
    });
  });
})

const {expect} = require('chai');
const {SBTree} = require('../..');
const {draw} = require('../../src/utils/ascii');
describe('Snapshots', function suite() {
  describe('Snapshot 1 - Simple incr - 1 to 17.', () => {
    const incTree = new SBTree({
      order: 3
    });
    const preventConsole = false;
    it('should match the snapshot on inserting', async function () {

      await incTree.insertDocuments({age: 1})
      await incTree.insertDocuments({age: 2})
      await incTree.insertDocuments({age: 3})
      const snapshot1 = await draw(incTree, preventConsole);
      const expectedSnapshot1 = [[2], [[1], [2, 3]]];
      expect(snapshot1).to.deep.equal(expectedSnapshot1);

      await incTree.insertDocuments({age: 4})
      const snapshot2 = await draw(incTree, preventConsole);
      const expectedSnapshot2 = [[2, 3], [[1], [2], [3, 4]]];
      expect(snapshot2).to.deep.equal(expectedSnapshot2);

      await incTree.insertDocuments({age: 5})
      const snapshot3 = await draw(incTree, preventConsole);
      const expectedSnapshot3 = [[3], [[2], [4]], [[1], [2], [3], [4, 5]]];
      expect(snapshot3).to.deep.equal(expectedSnapshot3);

      await incTree.insertDocuments({age: 6})
      await incTree.insertDocuments({age: 7})
      await incTree.insertDocuments({age: 8})
      await incTree.insertDocuments({age: 9})
      await incTree.insertDocuments({age: 10})
      await incTree.insertDocuments({age: 11})
      await incTree.insertDocuments({age: 12})
      await incTree.insertDocuments({age: 13})
      await incTree.insertDocuments({age: 14})
      await incTree.insertDocuments({age: 15})
      await incTree.insertDocuments({age: 16})
      await incTree.insertDocuments({age: 17})

      const snapshot = await draw(incTree, preventConsole);
      const expectedSnapshot = [[9], [[5], [13]], [[3], [7], [11], [15]], [[2], [4], [6], [8], [10], [12], [14], [16]], [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12], [13], [14], [15], [16, 17]]]
      expect(snapshot).to.deep.equal(expectedSnapshot);
    });
    it('should match the snapshot on removing', async function () {

      await incTree.deleteDocuments({age:17});
      const snapshot = await draw(incTree, preventConsole);
      const expectedSnapshot = [[9], [[5], [13]], [[3], [7], [11], [15]], [[2], [4], [6], [8], [10], [12], [14], [16]], [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12], [13], [14], [15,16]]]
      expect(snapshot).to.deep.equal(expectedSnapshot);

      await incTree.deleteDocuments({age:17});
      const snapshot2 = await draw(incTree, preventConsole);
      const expectedSnapshot2 = [[9], [[5], [13]], [[3], [7], [11], [15]], [[2], [4], [6], [8], [10], [12], [14], [16]], [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12], [13], [14], [15,16]]]
      expect(snapshot2).to.deep.equal(expectedSnapshot2);
    });
  });
})

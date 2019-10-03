const {expect} = require('chai');
const {SBTree} = require('../..');
const {draw}= require('../../src/utils/ascii');
describe('Snapshots', function suite() {
  describe('Snapshot 1 - Simple incr.', () => {
    const incTree = new SBTree({
      order: 3
    });
    const preventConsole = true;
    it('should match the snapshot', async function () {

      await incTree.insertDocuments({age:1})
      await incTree.insertDocuments({age:2})
      await incTree.insertDocuments({age:3})
      await incTree.insertDocuments({age:4})
      await incTree.insertDocuments({age:5})
      await incTree.insertDocuments({age:6})
      await incTree.insertDocuments({age:7})
      await incTree.insertDocuments({age:8})
      await incTree.insertDocuments({age:9})
      await incTree.insertDocuments({age:10})
      await incTree.insertDocuments({age:11})
      await incTree.insertDocuments({age:12})
      await incTree.insertDocuments({age:13})
      await incTree.insertDocuments({age:14})
      await incTree.insertDocuments({age:15})
      await incTree.insertDocuments({age:16})
      await incTree.insertDocuments({age:17})

      const snapshot = await draw(incTree, preventConsole);
      const expectedSnapshot = [[[9],[[5],[13]],[[3],[7],[11],[15]],[[2],[4],[6],[8],[10],[12],[14],[16]],[[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16,17]]]];
      expect(snapshot).to.deep.equal(expectedSnapshot);
    });
  });
})

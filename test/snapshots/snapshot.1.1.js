const {expect} = require('chai');
const {SBTree} = require('../..');
const {draw} = require('../../src/utils/ascii');
describe('Snapshots', function suite() {
  const fixture = require('../fixtures/snapshots/snapshot.1.1');

  describe('Snapshot 1 - Simple incr - 1 to 5 (deg:3).', () => {
    const incTree = new SBTree(fixture);
    const preventConsole = true;
    it('should match the snapshot on init', async function () {
      const snapshot3 = await draw(incTree, preventConsole);
      const expectedSnapshot3 = [[3], [[2], [4]], [[1], [2], [3], [4, 5]]];
      expect(snapshot3).to.deep.equal(expectedSnapshot3);
    });
    it('should match the snapshot on removing', async function () {
      await incTree.deleteDocuments({age: 5});
      const snapshot = await draw(incTree, preventConsole);
      const expectedSnapshot = [[3], [[2], [4]], [[1], [2], [3], [4]]];
      expect(snapshot).to.deep.equal(expectedSnapshot);

      const expectedSnapshot2 = [[3], [[2], [4]], [[1], [2], [3], [4, 5]]];
      await incTree.insertDocuments({age: 5})
      const snapshot2 = await draw(incTree, preventConsole);
      expect(snapshot2).to.deep.equal(expectedSnapshot2);
    });
    it('should deal with removing when its index', async function () {
      await incTree.deleteDocuments({age:4});

      const snapshot = await draw(incTree,preventConsole);
      const expectedSnapshot = [[3], [[2], [5]], [[1], [2], [3], [5]]];
      expect(snapshot).to.deep.equal(expectedSnapshot);

      await incTree.deleteDocuments({age:5});
      const snapshot2 = await draw(incTree,preventConsole);
      const expectedSnapshot2 = [[2,3],[[1],[2],[3]]];
      expect(snapshot2).to.deep.equal(expectedSnapshot2);
    });
  });
})

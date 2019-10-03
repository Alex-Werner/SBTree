const {expect} = require('chai');
const {SBTree} = require('../..');
const {draw}= require('../../src/utils/ascii');
describe('Snapshots', function suite() {
  describe('Snapshot 0 - Empty', () => {
    const incTree = new SBTree({
      order: 3
    });
    const preventConsole = true;
    it('should match the snapshot', async function () {
      const snapshot = await draw(incTree, preventConsole);
      const expectedSnapshot = [];
      expect(snapshot).to.deep.equal(expectedSnapshot);
    });
  });
})

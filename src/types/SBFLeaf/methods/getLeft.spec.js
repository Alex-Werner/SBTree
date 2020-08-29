const {expect} = require('chai');
const getLeft = require('./getLeft');

let called = [];
const self = {
      id: '16d72f309846d',
      getParent: function () {
        return {
          getAdapter: () => {
            return {
              getLeftInLeaf: (id) => {
                called.push([id]);
              }
            }
          }
        }
      },
    }
;
describe('SBFLeaf - methods - getLeft', () => {
  it('should getLeft', async function () {
    await getLeft.call(self)
    expect(called).to.deep.equal([['16d72f309846d']])
  });
});

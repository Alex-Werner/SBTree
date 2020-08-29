const {expect} = require('chai');
const findGreaterThan = require('./findGreaterThan');

let called = [];
const self = {
      id: '16d72f309846d',
      getParent: function () {
        return {
          getAdapter: () => {
            return {
              findInLeaf: (id, val, op) => {
                called.push([id,val, op]);
              }
            }
          }
        }
      },
    }
;
describe('SBFLeaf - methods - findGreaterThan', () => {
  it('should findGreaterThan', async function () {
    await findGreaterThan.call(self, 'Alex')
    expect(called).to.deep.equal([['16d72f309846d','Alex', '$gt']])
  });
});

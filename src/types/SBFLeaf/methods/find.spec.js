const {expect} = require('chai');
const find = require('./find');

let called = [];
const self = {
      id: '16d72f309846d',
      getParent: function () {
        return {
          getAdapter: () => {
            return {
              findInLeaf: (id, val) => {
                called.push([id,val]);
              }
            }
          }
        }
      },
    }
;
describe('SBFLeaf - methods - find', () => {
  it('should find', async function () {
    await find.call(self, 'Alex')
    expect(called).to.deep.equal([['16d72f309846d','Alex']])
  });
});

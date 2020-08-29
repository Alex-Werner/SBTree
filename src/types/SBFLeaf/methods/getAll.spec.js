const {expect} = require('chai');
const getAll = require('./getAll');

let called = [];
const self = {
      id: '16d72f309846d',
      getParent: function () {
        return {
          getAdapter: () => {
            return {
              getAllInLeaf: (id) => {
                called.push([id]);
              }
            }
          }
        }
      },
    }
;
describe('SBFLeaf - methods - getAll', () => {
  it('should getAll', async function () {
    await getAll.call(self)
    expect(called).to.deep.equal([['16d72f309846d']])
  });
});

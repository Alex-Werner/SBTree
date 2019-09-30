const {expect} = require('chai');
const insert = require('../../../../src/types/SBFLeaf/methods/insert');
const remove = require('../../../../src/types/SBFLeaf/methods/remove');

const jean = {identifier: '507f191e810c19729de860ea', name: 'Jean'};
const alex = {identifier: '507f1f77bcf86cd799439011', name: 'Alex'};
const seb = {identifier: '5d675592aa2c1a52a0eeaa46', name: 'Sebastien'};

let added = 0;
let removed = 0;
let _isSplitCalled = false
let _isAtLeastHalfFull = true
const self = {
      isAtLeastHalfFull: _isAtLeastHalfFull,
      getParent: function () {
        return {
          getAdapter: () => {
            return {
              addInLeaf: () => {
                added += 1;
              },
              removeInLeaf: () => {
                removed += 1;
              }
            }
          }
        }
      },
      split: () => _isSplitCalled = true
    }
;
describe('SBFLeaf - methods - remove', () => {
  it('should get it removed by adapter', async function () {
    await remove.call(self, jean.identifier);
    expect(_isAtLeastHalfFull).to.equal(true);
    expect(removed).to.equal(1);
  });
  it('should try to redistribute when less than half full', async function () {
    expect(_isSplitCalled).to.equal(false);
    await insert.call(self, alex.identifier, alex.name);
    expect(_isSplitCalled).to.equal(true);
  });
});

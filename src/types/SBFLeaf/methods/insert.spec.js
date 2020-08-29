const {expect} = require('chai');
const insert = require('./insert');

const jean = {identifier: '507f191e810c19729de860ea', name: 'Jean'};
const alex = {identifier: '507f1f77bcf86cd799439011', name: 'Alex'};
const seb = {identifier: '5d675592aa2c1a52a0eeaa46', name: 'Sebastien'};

let added = 0;
let _isFull = false;
let _isSplitCalled = false
const self = {
      isFull: () => _isFull,
      getParent: function () {
        return {
          getAdapter: () => {
            return {
              addInLeaf: () => {
                added += 1;
              }
            }
          }
        }
      },
      split: () => _isSplitCalled = true
    }
;
describe('SBFLeaf - methods - insert', () => {
  it('should get it inserted by adapter', async function () {
    await insert.call(self, jean.identifier, jean.name);
    expect(added).to.equal(1);
    expect(_isFull).to.equal(false);
  });
  it('should split when full', async function () {
    _isFull = true;
    expect(_isSplitCalled).to.equal(false);
    await insert.call(self, alex.identifier, alex.name);
    expect(_isSplitCalled).to.equal(true);
  });
});

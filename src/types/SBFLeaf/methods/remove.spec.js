const {expect} = require('chai');
const remove = require('./remove');

const jean = {identifier: '507f191e810c19729de860ea', name: 'Jean'};
const alex = {identifier: '507f1f77bcf86cd799439011', name: 'Alex'};
const seb = {identifier: '5d675592aa2c1a52a0eeaa46', name: 'Sebastien'};

let added = 0;
let removed = 0;
let _isSplitCalled = false
let _isFillFactorFilled = true
const self = {
      isFillFactorFilled: () => _isFillFactorFilled,

      getParent: function () {
        return {
          childrens:[
            {}
          ],
          getAdapter: () => {
            return {
              addInLeaf: () => {
                added += 1;
              },
              removeInLeaf: () => {
                removed += 1;
                return [jean]
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
    const isRemoved = await remove.call(self, jean.identifier);
    expect(isRemoved).to.equal(true);
    expect(_isFillFactorFilled).to.equal(true);
    expect(removed).to.equal(1);
  });
  it('should try to redistribute when less than fillFactor', async function () {
    _isFillFactorFilled = false;
    const isRemoved = await remove.call(self, alex.identifier);
    expect(isRemoved).to.equal(true);
    expect(removed).to.equal(2);

  });
});

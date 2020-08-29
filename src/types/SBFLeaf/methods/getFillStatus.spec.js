const {expect} = require('chai');
const getFillStatus = require('./getFillStatus');

let called = [];
let meta = {
  size: 0
}
const self = {
      id: '16d72f309846d',
      getParent: function () {
        return {
          getTreeOptions: () => {
            return {order: 3, fillFactor: 0.5}
          },
          getAdapter: () => {
            return {
              openLeaf: (id) => {
                called.push(['openLeaf', id]);
                return {
                  meta,
                }

              },
              getAllInLeaf: (id) => {
                called.push([id]);
              }
            }
          }
        }
      },
    }
;
describe('SBFLeaf - methods - getFillStatus', () => {
  it('should give the fill status of a leaf', async function () {
    const res = await getFillStatus.call(self)
    expect(res).to.deep.equal({
      fillFactor: 0.5,
      fillFactorFilled: false,
      leafSize: 0,
      order: 3,
    })
    meta.size++
    const res2 = await getFillStatus.call(self)
    expect(res2).to.deep.equal({
      fillFactor: 0.5,
      fillFactorFilled: true,
      leafSize: 1,
      order: 3,
    })
    meta.size++

    const res3 = await getFillStatus.call(self)
    expect(res3).to.deep.equal({
      fillFactor: 0.5,
      fillFactorFilled: true,
      leafSize: 2,
      order: 3,
    })
    expect(called).to.deep.equal([
        ['openLeaf','16d72f309846d'],
        ['openLeaf','16d72f309846d'],
        ['openLeaf','16d72f309846d'],
    ]);
  });
});

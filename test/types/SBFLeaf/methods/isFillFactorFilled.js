const {expect} = require('chai');
const isFillFactorFilled = require('../../../../src/types/SBFLeaf/methods/isAtLeastHalfFull');

let called = [];
let meta = {
  size:1
}
const self = {
      id: '16d72f309846d',
      getParent: function () {
        return {
          getTreeOptions:()=>{
            return {order:3}
          },
          getAdapter: () => {
            return {
              openLeaf:(id)=>{
                called.push(['openLeaf',id]);
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
describe('SBFLeaf - methods - isAtLeastHalfFull', () => {
  it('should tell if isAtLeastHalfFull', async function () {
    expect(await isFillFactorFilled.call(self)).to.equal(false);
    expect(called).to.deep.equal([['openLeaf','16d72f309846d']])
    meta.size++
    expect(await isFillFactorFilled.call(self)).to.equal(true);
  });
});

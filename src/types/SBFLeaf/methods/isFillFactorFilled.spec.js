const {expect} = require('chai');
const isFillFactorFilled = require('./isFillFactorFilled');

let called = [];
let meta = {
  size:0
}
const self = {
      id: '16d72f309846d',
      getParent: function () {
        return {
          getTreeOptions:()=>{
            return {order:5, fillFactor:0.5}
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
describe('SBFLeaf - methods - isFillFactorFilled', () => {
  it('should tell if not filled', async function () {
    expect(await isFillFactorFilled.call(self)).to.equal(false);
    expect(called).to.deep.equal([['openLeaf','16d72f309846d']])
    meta.size++
    expect(await isFillFactorFilled.call(self)).to.equal(false);


  });
  it('should tell if filled',async function () {
    expect(await isFillFactorFilled.call(self)).to.equal(false);
    meta.size++
    expect(await isFillFactorFilled.call(self)).to.equal(true);
  });
});

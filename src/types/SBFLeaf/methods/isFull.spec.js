const {expect} = require('chai');
const isFull = require('./isFull');

let called = [];
let meta = {
  size:2
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
describe('SBFLeaf - methods - isFull', () => {
  it('should tell if isFUll', async function () {
    expect(await isFull.call(self)).to.equal(false);
    expect(called).to.deep.equal([['openLeaf','16d72f309846d']])
    meta.size++
    expect(await isFull.call(self)).to.equal(true);
  });
});

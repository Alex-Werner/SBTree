const {expect} = require('chai');
const split = require('../../../../src/types/SBFLeaf/methods/split');

let called = [];
const self = {
      id: '16d72f309846d',
      getParent: function () {
        return {
          insertReferenceKey:()=>{
            called.push(['insertReferenceKey', ...arguments])
          },
          attachLeaf:(index, leaf)=>{
            called.push(['attachLeaf', index, leaf.id])
          },
          getAdapter: () => {
            return {
              createLeaf:()=>{
                called.push(['createLeaf', ...arguments])
              },
              getAllInLeaf: (id) => {
                called.push([id]);
              },
              splitLeaf:()=>{
                called.push(['splitLeaf'])
              }
            }
          }
        }
      },
    }
;
describe('SBFLeaf - methods - split', () => {
  it('should split as expected', async function () {
    await split.call(self);
    expect(called).to.deep.equal([
       [ 'createLeaf'],
       [ 'splitLeaf'],
       [ 'insertReferenceKey'],
       [ 'attachLeaf'],
    ])
  });
});

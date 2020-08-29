const {expect} = require('chai');
const split = require('./split');

let called = [];
const self = {
      id: '16d72f309846d',
      fieldName:'stuff',
      type:'leaf',
      getParent: function () {
        return {
          fieldName:'stuff',
          insertReferenceKey:(midKey)=>{
            called.push(['insertReferenceKey', midKey])
            return 3;
          },
          attachLeaf:(newIndex, newLeaf)=>{
            called.push(['attachLeaf', newIndex, newLeaf.id])
          },
          getAdapter: () => {
            return {
              createLeaf:(newLeafId)=>{
                called.push(['createLeaf', newLeafId])
              },
              getAllInLeaf: (id) => {
                called.push([id]);
              },
              splitLeaf:(currLeaf, newLeaf)=>{
                called.push(['splitLeaf', currLeaf.id, newLeaf.id])
                return 42;
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
    const newLeafId = (called[0][1]);

    expect(called).to.deep.equal([
       [ 'createLeaf',newLeafId],
       [ 'splitLeaf', self.id, newLeafId],
       [ 'insertReferenceKey', 42],
       [ 'attachLeaf', 4, newLeafId],
    ])
  });
});

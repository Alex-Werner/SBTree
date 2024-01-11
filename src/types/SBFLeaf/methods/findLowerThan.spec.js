import { expect } from 'chai';
// const findLowerThan = require('./findLowerThan');
import findLowerThan from './findLowerThan.js';

let called = [];
const self = {
      id: '16d72f309846d',
      getParent: function () {
        return {
          getAdapter: () => {
            return {
              findInLeaf: (id, val, op) => {
                called.push([id,val, op]);
              }
            }
          }
        }
      },
    }
;
describe('SBFLeaf - methods - findGreaterThan', () => {
  it('should findLowerThan', async function () {
    await findLowerThan.call(self, 'Alex')
    expect(called).to.deep.equal([['16d72f309846d','Alex', '$lt']])
  });
});

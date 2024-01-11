import { expect } from 'chai';
import getRight from './getRight.js';

let called = [];
const self = {
      id: '16d72f309846d',
      getParent: function () {
        return {
          getAdapter: () => {
            return {
              getRightInLeaf: (id) => {
                called.push([id]);
              }
            }
          }
        }
      },
    }
;
describe('SBFLeaf - methods - getRight', () => {
  it('should getRight', async function () {
    await getRight.call(self)
    expect(called).to.deep.equal([['16d72f309846d']])
  });
});

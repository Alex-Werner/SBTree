const {expect} = require('chai');
const {insertSorted} = require('../../src/utils/array');

describe('Utils - Array', () => {

  it('should insertSorted works with num', function () {
    const arr = [7];
    insertSorted(arr, 6);
    expect(arr).to.deep.equal([6, 7])
    insertSorted(arr, 8);
    expect(arr).to.deep.equal([6, 7, 8])
    insertSorted(arr, 10);
    expect(arr).to.deep.equal([6, 7, 8, 10])
  });
  it('should insertSorted works with string', function () {
    const arr = ['alex'];
    insertSorted(arr, 'alain');
    expect(arr).to.deep.equal(['alain','alex'])
    insertSorted(arr, 'jean');
    expect(arr).to.deep.equal(['alain','alex','jean'])
    insertSorted(arr, 'zachary');
    expect(arr).to.deep.equal(['alain','alex','jean','zachary'])
  });

});

import {expect} from 'chai';
import {insertSorted} from './array.js';

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
        expect(arr).to.deep.equal(['alain', 'alex'])
        insertSorted(arr, 'jean');
        expect(arr).to.deep.equal(['alain', 'alex', 'jean'])
        insertSorted(arr, 'zachary');
        expect(arr).to.deep.equal(['alain', 'alex', 'jean', 'zachary'])
    });
    it('should insertSorted works with array', function () {
        const arr = ['alex'];
        insertSorted(arr, ['alain', 'jean']);
        expect(arr).to.deep.equal(['alex','alain', 'jean'])
        insertSorted(arr, ['zachary', 'yann']);
        expect(arr).to.deep.equal(['alex','alain', 'jean', 'yann', 'zachary'])
    });
    it('should insertSorted works with array and num', function () {
        const arr = ['alex'];
        insertSorted(arr, ['alain', 'jean']);
        expect(arr).to.deep.equal(['alain', 'jean', 'alex'])
        insertSorted(arr, 1);
        expect(arr).to.deep.equal([1, 'alain', 'jean', 'alex'])
    });
    it('should insertSorted works with array and string', function () {
        const arr = ['alex'];
        insertSorted(arr, ['alain', 'jean']);
        expect(arr).to.deep.equal(['alain', 'jean', 'alex'])
        insertSorted(arr, 'zachary');
        expect(arr).to.deep.equal(['alain', 'jean', 'zachary', 'alex'])
    });
});

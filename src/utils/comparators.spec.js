import {expect} from 'chai';
import { comparatorDate, comparatorNum, comparatorString } from "./comparators.js";

describe('Utils - Comparators', () => {
    it('should comparatorString works', async function () {
        expect(comparatorString('a', 'b')).to.equal(-1);
        expect(comparatorString('b', 'a')).to.equal(1);
        expect(comparatorString('a', 'a')).to.equal(0);

        // should handle more complex cases
        expect(comparatorString('a', 1)).to.equal(-1);
        expect(comparatorString(1, 'a')).to.equal(1);
        expect(comparatorString('1', 1)).to.equal(0);
        expect(comparatorString('1', 2)).to.equal(-1);
        expect(comparatorString(2, '1')).to.equal(1);
        expect(comparatorString('2', 2)).to.equal(0);
    });
    it('should comparatorNum works', async function () {
        expect(comparatorNum(1, 2)).to.equal(-1);
        expect(comparatorNum(2, 1)).to.equal(1);
        expect(comparatorNum(1, 1)).to.equal(0);

        // should handle more complex cases
        expect(comparatorNum('a', 1)).to.equal(-1);
        expect(comparatorNum(1, 'a')).to.equal(1);
        expect(comparatorNum('1', 1)).to.equal(0);
        expect(comparatorNum('1', 2)).to.equal(-1);
        expect(comparatorNum(2, '1')).to.equal(1);
        expect(comparatorNum('2', 2)).to.equal(0);
    });
    it('should comparatorDate works', async function () {
        expect(comparatorDate(new Date(2020, 1, 1), new Date(2020, 1, 2))).to.equal(-1);
        expect(comparatorDate(new Date(2020, 1, 2), new Date(2020, 1, 1))).to.equal(1);
        expect(comparatorDate(new Date(2020, 1, 1), new Date(2020, 1, 1))).to.equal(0);

        // should handle more complex cases
        expect(comparatorDate('a', 1)).to.equal(-1);
        expect(comparatorDate(1, 'a')).to.equal(1);
        expect(comparatorDate('1', 1)).to.equal(0);
        expect(comparatorDate('1', 2)).to.equal(-1);
        expect(comparatorDate(2, '1')).to.equal(1);
        expect(comparatorDate('2', 2)).to.equal(0);
    });
});

import { expect } from 'chai';
import { comparatorString, comparatorNum, comparatorDate } from './comparators.js';

describe('Comparator Functions', () => {
    describe('comparatorString', () => {
        it('should compare basic strings correctly', () => {
            expect(comparatorString('apple', 'banana')).to.be.lessThan(0);
            expect(comparatorString('banana', 'apple')).to.be.greaterThan(0);
            expect(comparatorString('cherry', 'cherry')).to.equal(0);
        });

        it('should handle numbers as strings correctly', () => {
            expect(comparatorString('123', '1234')).to.be.lessThan(0);
            expect(comparatorString('1234', '123')).to.be.greaterThan(0);
            expect(comparatorString('123', '123')).to.equal(0);
        });

        it('should handle mixed types', () => {
            expect(comparatorString('123', 123)).to.equal(0);
            expect(comparatorString(true, 'true')).to.equal(0);
            expect(comparatorString(null, 'null')).to.equal(0);
            expect(comparatorString(undefined, 'undefined')).to.equal(0);
        });
    });

    describe('comparatorNum', () => {
        it('should compare numbers correctly', () => {
            expect(comparatorNum(1, 2)).to.be.lessThan(0);
            expect(comparatorNum(3, 2)).to.be.greaterThan(0);
            expect(comparatorNum(5, 5)).to.equal(0);
        });

        it('should handle floating point numbers', () => {
            expect(comparatorNum(1.2, 1.1)).to.be.greaterThan(0);
            expect(comparatorNum(2.3, 2.4)).to.be.lessThan(0);
            expect(comparatorNum(3.5, 3.5)).to.equal(0);
        });

        it('should handle mixed types', () => {
            expect(comparatorNum('123', 123)).to.equal(0);
            expect(comparatorNum('123.45', 123.45)).to.equal(0);
        });

        it('should handle edge cases', () => {
            expect(comparatorNum(NaN, 123)).to.be.deep.equal(NaN);
            expect(comparatorNum(123, NaN)).to.be.deep.equal(NaN);
            expect(comparatorNum(NaN, NaN)).to.be.deep.equal(NaN);
        });
    });

    describe('comparatorDate', () => {
        it('should compare dates correctly', () => {
            const date1 = new Date('2020-01-01');
            const date2 = new Date('2021-01-01');
            expect(comparatorDate(date1, date2)).to.be.lessThan(0);
            expect(comparatorDate(date2, date1)).to.be.greaterThan(0);
            expect(comparatorDate(date1, new Date('2020-01-01'))).to.equal(0);
        });

        it('should handle different time values correctly', () => {
            const date1 = new Date('2020-01-01T12:00:00');
            const date2 = new Date('2020-01-01T13:00:00');
            expect(comparatorDate(date1, date2)).to.be.lessThan(0);
            expect(comparatorDate(date2, date1)).to.be.greaterThan(0);
        });

        it('should handle invalid dates', () => {
            const validDate = new Date('2020-01-01');
            const invalidDate = new Date('not a date');
            expect(comparatorDate(validDate, invalidDate)).to.be.NaN;
            expect(comparatorDate(invalidDate, validDate)).to.be.NaN;
            expect(comparatorDate(invalidDate, invalidDate)).to.be.NaN;
        });

        it('should handle mixed types', () => {
            const validDate = new Date('2020-01-01');
            const dateString = '2020-01-01';
            expect(comparatorDate(validDate, new Date(dateString))).to.equal(0);
            expect(comparatorDate(new Date(dateString), validDate)).to.equal(0);
        });
    });
});

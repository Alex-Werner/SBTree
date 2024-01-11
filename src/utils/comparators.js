/**
 * Compares two strings and returns a sorting value.
 * @param {*} a - The first value to compare.
 * @param {*} b - The second value to compare.
 * @returns {number} - 1 if a > b, -1 if a < b, 0 if equal.
 */
export function comparatorString(a, b) {
    return a.localeCompare(b);
};

/**
 * Compares two numbers and returns a sorting value.
 * @param {number} a - The first number to compare.
 * @param {number} b - The second number to compare.
 * @returns {number} - 1 if a > b, -1 if a < b, 0 if equal.
 */
export function comparatorNum(a, b) {
    return Math.sign(a - b);
};

/**
 * Compares two Date objects and returns a sorting value.
 * @param {Date} a - The first date to compare.
 * @param {Date} b - The second date to compare.
 * @returns {number} - 1 if a > b, -1 if a < b, 0 if equal, or NaN if either date is invalid.
 */
export function comparatorDate(a, b) {
    if (!(a instanceof Date) || !(b instanceof Date) || Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) {
        return Number.NaN;
    }
    return Math.sign(a.getTime() - b.getTime());
};

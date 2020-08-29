const comparatorString = function (a, b) {
  if (typeof a !== 'string') a = String(a);
  if (typeof b !== 'string') b = String(b);
  return (a > b ? 1 : (a < b ? -1 : 0));
};
const comparatorNum = function (a, b) {
  return (a > b ? 1 : (a < b ? -1 : 0));
};
const comparators = {
  comparatorNum,
  comparatorString,
};
module.exports = comparators;

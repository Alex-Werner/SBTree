function getStrictMatchingKeys(arr, val) {
  const indexes = []; let
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) !== -1) {
    indexes.push(i);
  }
  return indexes;
}
module.exports = getStrictMatchingKeys;

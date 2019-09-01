const comparatorString = function(a, b) {
  if (typeof a !== 'string') a = String(a);
  if (typeof b !== 'string') b = String(b);
  return (a > b ? 1 : (a < b ? -1 : 0));
};
const comparatorNum = function (a,b) {
  return (a > b ? 1 : (a < b ? -1 : 0));
}
const array = {
  insertSorted:(arr, item)=>{
    if(!['number','string'].includes(typeof item )){
      throw new Error('Unsupported type')
    }
    const comparator = (typeof item ==='string') ? comparatorString : comparatorNum;
    let min = 0;
    let max = arr.length;
    let index = Math.floor((min + max) / 2);
    while (max > min) {
      if (comparator(item, arr[index]) < 0) {
        max = index;
      } else {
        min = index + 1;
      }
      index = Math.floor((min + max) / 2);
    }
    if(Array.isArray(item)){
      throw new Error('Not handled')
    }
    arr.splice(index, 0, item);
    return index;
  }
};
module.exports = array;

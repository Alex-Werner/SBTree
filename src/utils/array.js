const {comparatorString, comparatorNum} = require('./comparators')
const array = {
  insertSorted:(arr, item)=>{
    if(!['number','string'].includes(typeof item )){
      throw new Error(`Unsupported type typeof ${typeof item}`)
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
  },
  /*!
  * Sync/Async forEach
  * https://github.com/cowboy/javascript-sync-async-foreach
  *
  * Copyright (c) 2012 "Cowboy" Ben Alman
  * Licensed under the MIT license.
  * http://benalman.com/about/license/
  */
  forEach: async function(array, eachFn) {
      for (let index = 0; index < array.length; index++) {
        await eachFn(array[index], index, array)
      }
  }
};
module.exports = array;

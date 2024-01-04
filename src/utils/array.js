import { comparatorString, comparatorNum } from './comparators.js';
import { validTypes } from '../constants.js';


export function forEach(array, eachFn) {
  for (let index = 0; index < array.length; index++) {
    eachFn(array[index], index, array);
  }
}

export function insertSorted(arr, item) {
  if (!validTypes.includes(typeof item)) {
    throw new Error(`Unsupported type typeof ${typeof item}`);
  }
  const comparator = (typeof item === 'string') ? comparatorString : comparatorNum;
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
  if (Array.isArray(item)) {
    arr.splice(index, 0, ...item);
  } else {
    arr.splice(index, 0, item);
  }
  return index;
}

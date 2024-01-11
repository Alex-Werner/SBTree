import {comparatorString, comparatorNum} from './comparators.js';
import {validTypes} from '../constants.js';

export function forEach(array, eachFn) {
    for (let index = 0; index < array.length; index++) {
        eachFn(array[index], index, array);
    }
}


// TODO: Optimize this function
export function insertSorted(arr, item) {
    if (!validTypes.includes(typeof item)) {
        throw new Error(`Unsupported type typeof ${typeof item}`);
    }

    // // Binary search to find the correct insertion index
    function insertSingle(_item, _min = 0) {
        let comparator = (typeof _item === 'string') ? comparatorString : comparatorNum;
        // Binary search to find the correct insertion index
        let min = _min;
        let max = arr.length;
        while (max > min) {
            let index = Math.floor((min + max) / 2);
            if (comparator(_item, arr[index]) < 0) {
                max = index;
            } else {
                min = index + 1;
            }
        }
        // Insert item
        arr.splice(min, 0, _item);
        return min;
    }

    if (Array.isArray(item)) {
        // If item is an array, insert each element individually
        for (const elem of item.sort((typeof item === 'string') ? comparatorString : comparatorNum)) {
            if (!validTypes.includes(typeof elem)) {
                throw new Error(`Unsupported type in array: ${typeof elem}`);
            }
            insertSingle(elem);
        }
    } else {
        return insertSingle(item);
    }
}

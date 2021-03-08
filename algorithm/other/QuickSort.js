/**
 * 快速排序
 */


/**
 * 快速排序算法1.0
 * @param {*} array 
 * @returns 
 */
function QuickSort1(array) {
    let length = array.length;
    let p = Math.ceil(length / 2);

    if (p >= length) {
        return array;
    } else {
        array = Quick1(array, p);
        return QuickSort(array.slice(0, p)).concat(QuickSort(array.slice(p)))
    }
}

function Quick1(array, p) {
    let i = 0;
    let array_all = [];
    let array_right = [];

    for (; i < array.length; ++i) {
        if (array[i] > array[p]) {
            array_right.push(array[i]);
        } else {
            array_all.push(array[i])
        }
    }

    let x = 0;
    while (x < array_right.length) {
        array_all.push(array_right[x]);
        ++x;
    }

    return array_all;
}


/**
 * 快速排序算法2.0
 * @param {*} array 
 * @param {*} p 
 * @param {*} length 
 * @returns 
 */
function QuickSort2(array) {
    Quick2(array, 0, array.length);
    return array;
}

function Quick2(array, p, length) {
    if (p >= length) return array;

    let result = partition(array, p, length);
    let q = result.i;
    array = result.array;
    return Quick2(array, p, q).concat(Quick2(array, q + 1, length));
}

function partition(array, p, length) {
    let pivot = array[length - 1];
    let i = p;
    let j = p;

    for (; j < length - 1; ++j) {
        if (array[j] < pivot) {
            array = swap(array, i, j);
            ++i;
        }
    }

    array = swap(array, length - 1, i);
    return { i, array };
}

function swap(array, first, second) {
    let value = array[first];
    array[first] = array[second];
    array[second] = value;
    return array;
}

let array = [1, 3, 2, 5, 4];
console.log(QuickSort2(array));

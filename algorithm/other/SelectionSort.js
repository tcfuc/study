/**
 * 选择排序
 */

function SelectionSort(array) {
    let i = 0, j = 0;
    let length = array.length;
    let min;
    let value;

    for (; i < length; ++i) {
        j = i + 1;
        min = i;
        for (; j < length; ++j) {
            if (array[i] > array[j]) {
                min = j;
            }
        }
        if (i <= j) {
            value = array[i];
            array[i] = array[min];
            array[min] = value;
        }
    }

    return array;
}

let array = [1, 3, 2, 5, 4];
console.log(SelectionSort(array));

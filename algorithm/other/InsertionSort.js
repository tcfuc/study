/**
 * 插入排序
 */
function InsertionSort(array) {
    let i = 1, j = 0;
    let length = array.length;
    let value;

    if (length === 1) return;

    for (; i < length; ++i) {
        value = array[i];
        j = i - 1;
        for (; j >= 0; --j) {
            if (array[j] > value) {
                array[j + 1] = array[j];
            } else {
                break;
            }
        }
        array[j + 1] = value;
    }

    return array;
}

let array = [1, 3, 2, 5, 4];
console.log(InsertSort(array));


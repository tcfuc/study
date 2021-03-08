/**
 * 冒泡排序
 */
function BubbleSort(array) {
    let i = 0, j = 0;
    let length = array.length;
    let value;

    if (length === 1) return;

    for (i = 0; i < length; ++i) {
        let flag = false;
        for (j = 0; j < length - i - 1; ++j) {
            if (array[j] > array[j + 1]) {
                value = array[j];
                array[j] = array[j + 1];
                array[j + 1] = value;
            }
        }
        if (!flag) break;
    }

    return array;
}

let array = [1, 3, 2, 5, 4];
console.log(BubbleSort(array));

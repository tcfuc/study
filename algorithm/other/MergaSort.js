/**
 * 归并排序
 */
function MergaSort(array) {
    let length = array.length;
    let q = Math.ceil(length / 2);

    if (q >= length) {
        return array;
    } else {
        return Merga(MergaSort(array.slice(0, q)), MergaSort(array.slice(q)));
    }

}

function Merga(array1, array2) {
    let i = 0, j = 0;
    let length1 = array1.length;
    let length2 = array2.length;
    let array = [];

    while (i + j < length1 + length2) {
        if (i == length1 || array1[i] > array2[j]) {
            array[i + j] = array2[j];
            ++j;
        } else {
            array[i + j] = array1[i];
            ++i;
        }
    }
    
    return array;
}

let array = [1, 3, 2, 5, 4];
console.log(MergaSort(array));

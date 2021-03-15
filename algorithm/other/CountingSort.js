/**
 * 计数排序
 */
function CountingSort(array) {
    // 设置数组下标为值
    let array1 = [];
    for (let value of array) {
        if (array1[value]) {
            array1[value] = array1[value] + 1;
        } else {
            array1[value] = 1;
        }
    }

    // 设置数组值为下标
    let array2 = array1.concat();
    array1.reduce((pre, cur, index) => {
        array2[index] = pre + cur;
        return pre + cur;
    });

    // 排序
    let array3 = [];
    for (let i = 0; i < array1.length; ++i) {
        if (array1[i]) {
            let j = array1[i];
            while (j >= 0) {
                array3[array2[i] - j] = i;
                --j;
            }
        }
    }

    return array3;
}

let array = [2, 5, 3, 0, 2, 3, 0, 3];
console.log(CountingSort(array));

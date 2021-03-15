/**
 * 基数排序
 */
function RadixSort(array) {
    let arrayStr = [];

    for (let i = 10; i >= 0; --i) {
        arrayStr = array.map(item => item.toString());

        let array1 = [];
        for (let j = 0; j < array.length; ++j) {
            let index = parseInt(arrayStr[j][i]);
            if (!array1[index]) {
                array1[index] = [];
            }
            array1[index].push(array[j]);
        }

        let array3 = [];
        array1.forEach(array2 => {
            array2.forEach(item => {
                array3.push(item);
            })
        })
        array = array3.concat();
    }

    return array;
}

let array = [
    13682677658,
    18923492222,
    13517117111,
    13927413143,
    13825295678,
    13871521999,
    18867237777,
    13688831777,
    15575666666,
    13662606789,
    13049431413,
    18566606668,
    18737134666,
    13986125999,
    15616839999,
    13026682878,
    16675191341,
    13641449493,
    17836999996,
    18975138888
]

console.log(RadixSort(array));




function guidDeDup() {
    let i = 0;
    let j = 0;
    let a;
    let b;

    function guid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    }

    while (i < 10000000) {
        a = guid();
        if (a == b) {
            ++j;
        }
        b = a;
        ++i;
    }
}

function max(a, b) {
    return (a > b) ? a : b;
}

/**
 * 递归
 * @param {*} capacity 背包容量
 * @param {*} size 物品大小
 * @param {*} value 物品价值
 * @param {*} n 物品下标
 */
function knapsack(capacity, size, value, n) {
    if (n == 0 || capacity == 0) {
        return 0;
    }
    if (size[n - 1] > capacity) {
        return knapsack(capacity, size, value, n - 1);
    } else {
        return max(value[n - 1] + knapsack(capacity - size[n - 1], size, value, n - 1), knapsack(capacity, size, value, n - 1))
    }
}

/**
 * 动态规划
 * @param {*} capacity 
 * @param {*} size 
 * @param {*} value 
 * @param {*} n 
 */
function dKnapsack(capacity, size, value, n) {

}

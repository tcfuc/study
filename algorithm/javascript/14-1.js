/**
 * 求最大值
 * @param {*} a 
 * @param {*} b 
 */
function max(a, b) {
    return (a > b) ? a : b;
}

/** */

function print(str) {
    console.log(str);
}

/**
 * 递归
 * @param {*} capacity 背包容量
 * @param {*} size 物品大小
 * @param {*} value 物品价值
 * @param {*} n 物品位置
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
 * @param {*} capacity 背包容量
 * @param {*} size 物品大小
 * @param {*} value 物品价值
 * @param {*} n 物品位置
 */
function dKnapsack(capacity, size, value, n) {
    let K = [];
    for (let i = 0; i <= capacity; i++) {
        K[i] = [];
    }

    for (let i = 0; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (i == 0 || w == 0) {
                K[i][w] = 0;
            } else if (size[i - 1] <= w) {
                K[i][w] = max(value[i - 1] + K[i - 1][w - size[i - 1]], K[i - 1][w])
            } else {
                K[i][w] = K[i - 1][w];
            }
            process.stdout.write(K[i][w] + " ");
        }
        print("");
    }

    return K[n][capacity];
}

const size = [3, 4, 7, 8, 9];
const value = [4, 5, 10, 11, 13];
const capacity = 16;
const n = 5;

print(dKnapsack(capacity, size, value, n))
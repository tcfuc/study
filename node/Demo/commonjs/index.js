var playerAction = process.argv[process.argv.length - 1];
// 引入外部js
const game = require('./lib');

let count = 0;
// 获取进程标准输入 转为字符串输出
process.stdin.on('data', e => {
    const playerAction = e.toString().trim();
    console.log(playerAction);
    const result = game(playerAction);

    if (result === -1) {
        ++count;
    }

    if (count === 3) {
        console.log('不是你赢了，是我不想玩了！')
        process.exit();
    }
})

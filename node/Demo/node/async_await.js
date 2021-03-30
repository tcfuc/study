(async function () {
    try {
        await interviewPromise(1);
        await interviewPromise(2);
        await interviewPromise(3);
    } catch (err) {
        return console.log('cry at ' + err.round);
    }
    console.log('smile')
})();

function interviewPromise(round) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.5) {
                resolve('success');
            } else {
                var error = new Error('fail');
                error.round = round;
                reject(error)
            }
        }, 500);
    })
}




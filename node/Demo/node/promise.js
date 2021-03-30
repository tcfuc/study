var promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve(1);
    }, 500)
}).then(function (res) {
    console.log(res);
}).catch(function (err) {
    console.log(err);
})

console.log(promise);

setTimeout(() => {
    console.log(promise);
}, 800);


(function () {
    var promise =
        interviewPromise(1)
            .then(() => {
                return interviewPromise(2);
            })
            .then(() => {
                return interviewPromise(2);
            })
            .then(() => {
                console.log('smile')
            })
            .catch((err) => {
                console.log('cry at ' + err.round + ' round');
            });

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
})();


(function () {
    Promise.all([
        interviewPromise('Geek'),
        interviewPromise('Tencent')
    ]).then(() => {
        console.log('smile')
    }).catch((err) => {
        console.log('cry for ' + err.name);
    })

    function interviewPromise(name) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.5) {
                    resolve('success');
                } else {
                    var error = new Error('fail');
                    error.name = name;
                    reject(error)
                }
            }, 500);
        })
    }
})();




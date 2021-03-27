function chart(method) {
    let res = null;
    switch (method) {
        case 'GET':
            res = [20, 40, 60, 10, 30, 50];
            break;
        default:
            res = null;
    }
    return res;
}

module.exports = chart;

const EventEmitter = require('events').EventEmitter;

class GeekTime extends EventEmitter {
    constructor() {
        super();
        setInterval(() => {
            this.emit('newlesson', { price: Math.random() * 100 })
        }, 3000)
    }
}

const geektime = new GeekTime;

geektime.addListener('newlesson', (res) => {
    console.log('新课程上线了！', res);
    if(res.price < 80){
        console.log('我买了！')
    }
})

const utils = require('./utils');
const print = utils.print;

const fs = require("fs");

function Queue() {
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty;
}

function enqueue(element) {
    this.dataStore.push(element);
}

function dequeue() {
    return this.dataStore.shift();
}

function front() {
    return this.dataStore[0];
}

function back() {
    return this.dataStore[this.dataStore.length - 1];
}

function toString() {
    let string = '';
    for (let i = 0; i < this.dataStore.length; ++i) {
        string += this.dataStore[i] + '\n';
    }
    return string;
}

function empty() {
    if (this.dataStore.length == 0) {
        return true;
    } else {
        return false;
    }
}


function Dancer(name, sex) {
    this.name = name;
    this.sex = sex;
}

function getDancers(males, females) {
    const dancersInfo = fs.readFileSync('./dancers.txt').toString().split(" \r\n");
    for (let i = 0; i < dancersInfo.length; ++i) {
        const dancerInfo = dancer[i].split(" ");
        if (dancer.sex == 'M') {
            males.enqueue(new Dancer(dancerInfo[0], dancerInfo[1]));
        } else if (dancer.sex == 'F') {
            females.enqueue(new Dancer(dancerInfo[0], dancerInfo[1]));
        }
    }
}


print(dancers);


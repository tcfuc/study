const utils = require('./utils');
const print = utils.print;

/**
 * 创建一个记录学生成绩的对象，提供一个添加成绩的方法，以及一个显示学生平均成绩的方法。
 */

function student() {
    this.achvs = [];
    this.addAchvs = addAchvs;
}

function achv(subject, grade) {
    this.subject = subject;
    this.grade = grade;
}

function addAchvs(achv) {
    this.achvs.push(achv);
};

function displayAverage(achvs) {
    let grades = 0;

    for (let i = 0; i < achvs.length; i++) {
        grades = grades + achvs[i].grade;
    }

    return grades / achvs.length;
}

const student1 = new student();
const achv1 = new achv('语文', 99);
const achv2 = new achv('数学', 86);
const achv3 = new achv('英语', 88);
student1.addAchvs(achv1);
student1.addAchvs(achv2);
student1.addAchvs(achv3);
print(displayAverage(student1.achvs));


/**
 * 将一组单词存储在一个数组中，并按正序和倒序分别显示这些单词。
 */

const array = ['apple', 'banana', 'cat'];

function displayWords(array) {
    for (let i = 0; i < array.length; i++) {
        print(array[i]);
    };

    let reverse = array.reverse();
    for (let j = 0; j < reverse.length; j++) {
        print(reverse[j])
    }
}

displayWords(array);


/**
 * 修改本章前面出现过的 weeklyTemps 对象，使它可以使用一个二维数组来存储每月的有用数据。增加一些方法用以显示月平均数、具体某一周平均数和所有周的平均数。
 * 假设每月为四周
 */
function temps() {
    this.monthDataStore = Array.matrix(12, 28, 0);
    this.monthAverage = monthAverage;
    this.weekAverage = weekAverage;
    this.weeklyAverage = weeklyAverage;
}

Array.matrix = (numrows, numcols, initial) => {
    let array = [];
    for (let i = 0; i < numrows; i++) {
        let columns = [];
        for (let j = 0; j < numcols; j++) {
            columns[j] = initial;
        }
        array[i] = columns;
    }
    return array;
}

function monthAverage(month) {
    const length = this.monthDataStore[month - 1].length;
    let total = 0;
    for (let i = 0; i < length; i++) {
        total += this.monthDataStore[month - 1][i];
    }

    return total / length;
}

function weekAverage(week) {
    const month = parseInt(week / 4);
    const start = (week % 4 - 1) * 7 - 1;
    const end = (week % 4) * 7 - 1;
    let total = 0;
    for (let i = start; i < end; i++) {
        total += this.monthDataStore[month][i];
    }

    return total / 7;
}

function weeklyAverage() {
    let total = 0;
    let length = 0;
    for (let i = 0; i < this.monthDataStore.length; i++) {
        for (let j = 0; j < this.monthDataStore[i].length; j++) {
            total += parseInt(this.monthDataStore[i][j]);
            length++;
        }
    }

    return total/length;
}

const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
const newTemps = new temps();
newTemps.monthDataStore[0] = month;
print(newTemps.monthAverage(1));
print(newTemps.weekAverage(3));
print(newTemps.weeklyAverage());

/**
 * 创建这样一个对象，它将字母存储在一个数组中，并且用一个方法可以将字母连在一 起，显示成一个单词。
 */
function word() {
    this.letters = [];
    this.getWord = getWord;
}

function getWord() {
    return this.letters.join('');
}

const newWord = new word();
newWord.letters.push('a');
newWord.letters.push('p');
newWord.letters.push('p');
newWord.letters.push('l');
newWord.letters.push('e');
print(newWord.getWord());

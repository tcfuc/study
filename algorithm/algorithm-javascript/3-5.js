const utils = require('./utils');
const print = utils.print;

const fs = require('fs');

function List(){
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = [];
    this.append = append;
    this.remove = remove;
    this.find = find;
    this.front = front;
    this.end = end;
    this.prev = prev;
    this.next = next;
    this.getElement = getElement;
    this.insertIfMax = insertIfMax;
    this.insertIfMin = insertIfMin;
    this.contains = contains;
}

function append(element){
    this.dataStore[this.listSize++] = element;
}

function remove(element){
    const foundAt = this.find(element);
    if(foundAt > -1){
        this.dataStore.splice(foundAt, 1);
        --this.listSize;
        return true;
    }
    return false;
}

function find(element){
    for(this.front(); this.pos < this.listSize; this.next()){
        if(this.dataStore[this.pos] == element){
            return this.pos;
        }
    }
    return -1;
}

function front(){
    this.pos = 0;
}

function end(){
    this.pos = this.listSize - 1;
}

function prev(){
    this.pos = this.pos - 1;
}

function next(){
    this.pos = this.pos + 1;
}

function getElement(){
    return this.dataStore[this.pos];
}

function contains(element){
    for(this.front(); this.pos < this.listSize; this.next()){
        if(this.dataStore[i] == element){
            return true;
        }
    }
    return false;
}



/**
 *  增加一个向列表中插入元素的方法，该方法只在待插元素大于列表中的所有元素时才执 行插入操作。这里的大于有多重含义，对于数字，它是指数值上的大小；对于字母，它 是指在字母表中出现的先后顺序。
 */
function insertIfMax(element){
    for(this.front(); this.pos < this.listSize; this.next()){
        if(typeof element == typeof this.dataStore[this.pos]){
            if(element < this.getElement()){
                return;
            }
        }
    }
    this.append(element);
    return;
}


/**
 * 增加一个向列表中插入元素的方法，该方法只在待插元素小于列表中的所有元素时才执 行插入操作。
 */
function insertIfMin(element){
    for(this.front(); this.pos < this.listSize; this.next()){
        if(typeof element == typeof this.dataStore[this.pos]){
            if(element > this.getElement()){
                return;
            }
        }
    }
    this.append(element);
    return;
}


/**
 * 创建 Person 类，该类用于保存人的姓名和性别信息。创建一个至少包含 10 个 Person 对象的列表。写一个函数显示列表中所有拥有相同性别的人。
 */
const list = new List();

function Person(name, sex){
    this.name = name;
    this.sex = sex;
}

const person1 = new Person('A', 'man');
const person2 = new Person('B', 'man');
const person3 = new Person('C', 'man');
const person4 = new Person('D', 'man');
const person5 = new Person('E', 'man');
const person6 = new Person('F', 'woman');
const person7 = new Person('G', 'woman');
const person8 = new Person('H', 'woman');
const person9 = new Person('I', 'woman');

list.append(person1);
list.append(person2);
list.append(person3);
list.append(person4);
list.append(person5);
list.append(person6);
list.append(person7);
list.append(person8);
list.append(person9);

displaySameSex(list, 'man');

function displaySameSex(list, sex){
    for(list.front(); list.pos < list.listSize; list.next()){
        if(list.getElement().sex == sex){
            print(list.getElement().name);
        }
    }
    return;
}

/**
 * 修改本章的影碟租赁程序，当一部影片检出后，将其加入一个已租影片列表。每当有客户检出一部影片，都显示该列表中的内容。
 */
const movies = fs.readFileSync('./movies.txt').toString().substring(1).split(" \r\n");

const movieList = new List();

for(let i = 0; i < movies.length; ++i){
    movieList.append(movies[i]);
}

const rentedMovieList = new List();
const customerList = new List();

function Customer(name, movie){
    this.name = name;
    this.movie = movie;
}

function rentMovie(movieList, customer, customerList, rentedMovieList){
    for(movieList.front(); movieList.pos < movieList.listSize; movieList.next()){
        if(movieList.getElement() == customer.movie){
            customerList.append(customer);
            rentedMovieList.append(customer.movie);
            movieList.remove(movieList.getElement());
            displayList(customerList);
            displayList(rentedMovieList);
        }
    }
}

function displayList(list){
    for(list.front(); list.pos < list.listSize; list.next()){
        if(list.getElement() instanceof Customer){
            print('name:' + list.getElement()['name'] + "," +'movie:' + list.getElement()['movie']);
        } else {
            print(list.getElement());
        }
    }
}

const Jerry = new Customer("Jerry", "(14) Inception（《盗梦空间》）");

rentMovie(movieList, Jerry, customerList, rentedMovieList);


/**
 * 为影碟租赁程序创建一个 check-in() 函数，当客户归还一部影片时，将该影片从已租列 表中删除，同时添加到现有影片列表中。
 */
function checkIn(customer, movieList, rentedMovieList, customerList){
    rentedMovieList.remove(customer.movie);
    movieList.append(customer.movie);
    customerList.remove(customer);
}

checkIn(Jerry, movieList, rentedMovieList, customerList);
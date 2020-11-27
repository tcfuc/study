const utils = require('./utils');
const print = utils.print;

function Stack() {
    this.dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.clear = clear;
    this.length = length;
    this.empty = empty;
}

function push(element) {
    this.dataStore[this.top++] = element;
}

function pop() {
    return this.dataStore[--this.top];
}

function peek() {
    return this.dataStore[this.top - 1];
}

function clear() {
    this.top = 0;
}

function length() {
    return this.top;
}

function empty() {
    if (this.top == 0) {
        return true;
    } else if (this.top > 0) {
        return false;
    }
}

const stack = new Stack();

function mulBaseRe(num, base) {
    if (num > 0) {
        num = Math.floor(num /= base);
        return (num % base).toString() + mulBaseRe(num, base);
    } else {
        return "";
    }
}

function mulBase(num, base) {
    let string = "";

    do {
        stack.push(num % base);
        num = Math.floor(num /= base);
    } while (num > 0);

    while (stack.length() > 0) {
        string += stack.pop();
    }
    return string;
}

print(mulBaseRe(15, 5));
print(mulBase(15, 5));

function isPalindrome(word) {
    const stack = new Stack();

    for (let i = 0; i < word.length; ++i) {
        stack.push(word[i]);
    }

    let rword = "";

    while (stack.length() > 0) {
        rword += stack.pop()
    }

    if (word === rword) {
        return true;
    } else {
        return false;
    }
}

print(isPalindrome('aba'));

function fact(n) {
    const stack = new Stack();

    while (n > 0) {
        stack.push(n);
        --n;
    }

    let num = 1;

    while (stack.length() > 0) {
        num *= stack.pop()
    }

    return num;
}

print(fact(10));


/**
 * 1. 栈可以用来判断一个算术表达式中的括号是否匹配。编写一个函数，该函数接受一个算 术表达式作为参数，返回括号缺失的位置。下面是一个括号不匹配的算术表达式的例 子：2.3 + 23 / 12 + (3.14159×0.24。
 */
function displayPos(count) {
    const countStack = new Stack();
    const bracketStack = new Stack();

    for (let i = 0; i < count.length; ++i) {
        countStack.push(count[i]);
        if (count[i] == "(") {
            bracketStack.push(i);
        } else if (count[i] == ")") {
            bracketStack.pop();
        }
    }

    while (bracketStack.length() > 0) {
        print(bracketStack.pop());
    }
}

const countWord = '2.3+23/12+(3.14159×0.24';

displayPos(countWord);
/**
 * 2. 一个算术表达式的后缀表达式形式如下： op1 op2 operator 使用两个栈，一个用来存储操作数，另外一个用来存储操作符，设计并实现一个 JavaScript 函 数，该函数可以将中缀表达式转换为后缀表达式，然后利用栈对该表达式求值。
 */
const numStack = new Stack();
const symbolStack = new Stack();

function infixToSuffix(ex) {
    const numRep = /[0-9]/;
    const symbolRep = /[+|-|*|/]/;
    const firstSymbolRep = /[|*|/]/;
    const secondSymbolRep = /[+|-]/;
    for (let i = 0; i < ex.length; ++i) {
        if (numRep.test(ex[i])) {
            numStack.push(ex[i]);
        } else if (ex[i] == '(') {
            symbolStack.push(ex[i])
        } else if (firstSymbolRep.test(ex[i])) {
            symbolStack.push(ex[i]);
        } else if (secondSymbolRep.test(ex[i])) {
            while (firstSymbolRep.test(symbolStack.peek())) {
                numStack.push(symbolStack.pop());
            }
            symbolStack.push(ex[i]);
        } else if (ex[i] == ')') {
            while (symbolStack.peek() != '(') {
                numStack.push(symbolStack.pop());
            }
            symbolStack.pop();
        }
    }

    while (numStack.length() > 0) {
        symbolStack.push(numStack.pop());
    }

    while (symbolStack.length() > 0) {
        if (numRep.test(symbolStack.peek())) {
            numStack.push(symbolStack.pop())
        } else if (symbolRep.test(symbolStack.peek())) {
            numStack.push(eval(numStack.pop() + symbolStack.pop() + numStack.pop()));
        }
    }

    print(numStack.peek());
}

infixToSuffix('(1+1)*3+(2+4)*4');


/**
 * 3. 现实生活中栈的一个例子是佩兹糖果盒。想象一下你有一盒佩兹糖果，里面塞满了红 色、黄色和白色的糖果，但是你不喜欢黄色的糖果。使用栈（有可能用到多个栈）写一 段程序，在不改变盒内其他糖果叠放顺序的基础上，将黄色糖果移出。
 */
function Candy(color) {
    this.color = color;
}

const a = new Candy("red");
const b = new Candy("red");
const c = new Candy("white");
const d = new Candy("yellow");
const e = new Candy("red");
const f = new Candy("white");
const g = new Candy("white");
const h = new Candy("red");

const candyStack = new Stack();
candyStack.push(a);
candyStack.push(b);
candyStack.push(c);
candyStack.push(d);
candyStack.push(e);
candyStack.push(f);
candyStack.push(g);
candyStack.push(h);

function findYellowCandy(candyStack) {
    const storeStack = new Stack();
    const discardStack = new Stack();

    while (candyStack.length() > 0) {
        let currentCandy = candyStack.pop();
        if (currentCandy.color == 'yellow') {
            discardStack.push(currentCandy);
        } else {
            storeStack.push(currentCandy);
        }
    }

    while (storeStack.length() > 0) {
        candyStack.push(storeStack.pop())
    }

    return candyStack;
}

function displayStack(stack) {
    for (let i = 0; i < stack.length(); i++) {
        print(stack.dataStore[i].color);
    }
}

displayStack(findYellowCandy(candyStack));

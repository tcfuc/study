/**
 * 生成UUID
 */
function guidDeDup() {
    let i = 0;
    let j = 0;
    let a;
    let b;

    function guid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    }

    while (i < 10000000) {
        a = guid();
        if (a == b) {
            ++j;
        }
        b = a;
        ++i;
    }
}


/**
 * 栈
 */
function stack (){
    this.array = [];
    this.length = 0;
    this.add = (value) => add(value);
    this.del = () => del();
    this.read = () => read();
}

function add(value){
    this.array[this.length] = value;
    ++this.length;
}

function del(){
    this.array[this.length - 1] = null;
}

function read(){
    console.log(this.array.shift());
}



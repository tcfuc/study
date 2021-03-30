this.a = 20;
var test = {
    a: 40,
    init: () => {
        console.log(this.a);
        function go() {
            console.log(this.a);
        }
        go.prototype.a = 50;
        return go;
    },
    init1: () => {
        console.log(this.a);
        function go() {
            console.log(this.a);
        }
        go.prototype.a = 50;
        return go;
    }
}

new (test.init());
new (test.init1());

for (var i = 0; i < 5; i++) {
    console.log(i);
    setTimeout(function () {
        console.log(i);
    }, 10);
}
console.log(10);


function test1(){
    this.a = a;
}
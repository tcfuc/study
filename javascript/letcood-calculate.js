// 简单四则运算
var calculate = function (s) {
    const cal = (num1, opera, num2) => {
        let result;
        num1 = parseInt(num1);
        num2 = parseInt(num2);

        switch (opera) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = Math.floor(num1 / num2);
                break;
        }

        return result;
    }

    let array1 = [];
    let string = s.replace(/\s+/g, "").split("").reduce((pre, cur) => {
        if ("+-*/".indexOf(cur) != -1) {
            array1.push(pre);
            array1.push(cur);
            return "";
        } else {
            return pre + cur;
        }
    });
    array1.push(string);

    // let array2 = [];

    // array1.reverse();
    // while (array1.length > 0) {
    //     let value = array1.pop();
    //     if ("*/".indexOf(value) != -1) {
    //         array2.push(cal(array2.pop(), value, array1.pop()))
    //     } else {
    //         array2.push(value);
    //     }
    // }

    // array2.reverse();
    // let result = array2.pop();

    // while (array2.length > 0) {
    //     result = cal(result, array2.pop(), array2.pop());
    // }

    // return result;


    let index1 = 0;
    let index2 = -1;
    while (index1 < array1.length) {
        let value = array1[index1];
        if ("*/".indexOf(value) != -1) {
            ++index1;
            array1[index2] = cal(array1[index2], value, array1[index1]);
        } else {
            ++index2;
            array1[index2] = value;
        }
        ++index1;
    }
    index1 = 0;
    while (index1 < index2) {
        array1[0] = cal(array1[0], array1[++index1], array1[++index1]);
    }

    return array1[0];
};

var calculateBest = function (s) {
    let array = [];
    let value = 0;
    let opera = "+";

    for (let i = 0; i <= s.length; ++i) {
        let char = s.charAt(i);

        if (char == " ") {
            continue;
        }
        if ("0" <= char && char <= "9") {
            value = value * 10 + parseInt(char);
            continue;
        }
        if (opera == "+") {
            array.push(value);
        } else if (opera == "-") {
            array.push(-value);
        } else if (opera == "*") {
            array.push(array.pop() * value);
        } else if (opera == "/") {
            array.push(Math.trunc(array.pop() / value));
        }
        opera = char;
        value = 0;
    }

    return array.reduce((pre, cur) => {
        return pre + cur;
    }, 0);
}

// 识别括号
var calculatePlus = function (s) {
    let array = [];

    for (let i = 0; i <= s.length; ++i) {
        let char = s.charAt(i);
        if (char != ")") {
            array.push(char);
        } else {
            let string = array.join("");
            let index = string.lastIndexOf("(");
            array.splice(index);
            array.push(calculateBest(string.substr(index + 1)));
        }
    }

    return calculateBest(array.join(""));
}

var calculatePlus2 = function (s) {
    let leftIndex = s.indexOf("(");
    let rightIndex = s.lastIndexOf(")");
    if (leftIndex !== -1 && rightIndex !== -1) {
        s = s.slice(0, leftIndex) + calculatePlus2(s.slice(leftIndex + 1, rightIndex)).toString() + s.slice(rightIndex + 1);
    }

    return calculateBest(s);
}




/**
 * @pfunc 反转字符串
 * @param {String} str 要反转的字符串
 * @returns {String} 反转后的字符串
 **/
// function reverseString(str){
//     // str 是什么类型？ 字符串 简单数据类型 primitive
//     // 
//     return str.split(' ').reverse().join();
// }


// es5 函数表达式
const  reverseString1 = function(str){
    return str.split(' ').reverse().join();
}

// 第二种写法  
// es6 箭头函数  简洁 function 不要了 用箭头代替
// {}也省了 只有一句话的时候 
// 它是返回值的时候 连return 都可以省略
const reverseString2 = (str) => str.split("").reverse().join();
console.log(reverseString2("hello world"));

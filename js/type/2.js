console.log(0/0);//NaN
console.log(Math.sqrt(-1));//平方根 输出NaN   js的内置对象
console.log(parseInt('123'),parseInt('a123'),parseInt('123a'));//123 NaN 123
console.log(Number(undefined));//NaN
console.log(NaN === NaN);//false  Not a Number 的方法有很多种
console.log(isNaN(NaN),isNaN(0/0));//true true

console.log(typeof NaN);//number

// isNaN() ：会先尝试把参数转换为数值，再判断转换结果是否为 NaN 。
// Number.isNaN() ：只会判断参数本身是否为 NaN ，不会进行类型转换。
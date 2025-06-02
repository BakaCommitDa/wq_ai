// const bigNum = 123456789012345678901234567890123456789;
const bigNum = 123456789012345678901234567890123456789n;
// BigeInt 声明方式 函数声明
// bigint 简单数据类型 ，不是对象， 不是构造函数
const theNum = BigInt('123456789012345678901234567890123456789');//第二种写法,要加引号
// console.log(bigNum + 1,theNum + 1);//错误写法,要加n,两者类型不同,不能相加
console.log(bigNum,theNum,typeof bigNum,typeof 1);


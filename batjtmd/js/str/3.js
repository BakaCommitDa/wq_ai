// 包装类
let a = "abc";
let b = new String("abc");
console.log(a == b);// 值相等
// JS 给所有的简单数据类型提供了 相应类型的类 包装类
console.log(a === b);// 值和类型相等
console.log(b.split(""));
// 为了统一面向对象写法
// JS 会主动将简单数据类型 包装成 相应的包装类对象
// a -> new String(a)

console.log(a.split(""));
// 之后会销毁对象，回归原来的简单数据类型

let obj = {a:1,b:2};
// 太常用，大型语言都内置的，[]{}不够用
// HashMap 字典 以O(1) 时间复杂度 进行增删改查  key:value

const target = new Map(); // 实例化 es6 新的数据结构  强的
target.set('c',3);
// console.log(target.get('c'));
target.set(obj,4); /// 和JSON不一样的地方 对象做key
// console.log(target.get(obj));
obj = null;
console.log(target.get(obj)); 




let obj2 = {name:'额'};
const target2 = new WeakMap(); // Weak 弱的，
target2.set(obj2,'code 秘密话语')
obj2 = null;// 内存垃圾的回收
console.log(target2.get(obj2));



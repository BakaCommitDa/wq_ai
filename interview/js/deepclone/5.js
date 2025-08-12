const target = {
    a:1,
};
// 如果是简单数据类型 ， 会忽略
Object.assign(target,null);
Object.assign(target,undefined);
console.log(target);

// 目标对象得是对象
// Object.assign(undefined,{a:1});


const obj = {name:"张三"};
Object.assign(obj);
console.log(obj);

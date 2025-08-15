// 完成的功能
// function objectFactory(){
//     var obj = {};
//     // obj.__proto__ = arguments[0].prototype
//     // 类数组上没有shift 方法，所以借用数组的shift方法
//     var Constructor = [].shift.call(arguments);// 构造函数
//     obj.__proto__ = Constructor.prototype
//     var ret = Constructor.apply(obj,arguments)
//     //  || 处理null 的情况  如果是null仍然会返回object  构造函数 return是1简单类型，忽略
//     return typeof ret ==='onject' ? ret || obj :obj;
// }

// es6 版本
function objectFactory(Constructor,...args){
    var obj = {};
    // obj.__proto__ = arguments[0].prototype
    // 类数组上没有shift 方法，所以借用数组的shift方法
    // var Constructor = [].shift.call(arguments);// 构造函数
    obj.__proto__ = Constructor.prototype
    var ret = Constructor.apply(obj,args)
    //  || 处理null 的情况  如果是null仍然会返回object  构造函数 return是1简单类型，忽略
    return typeof ret ==='onject' ? ret || obj :obj;
}


function Person(name,age){
    this.name = name
    this.age = age
    // return {
    //     name:name,
    //     age:age,
    //     label:'hahaha'
    // }
    return null;
}

Person.prototype.sayhi = function(){
    console.log(`你好，我是${this.name}`);
}

let p1 = new Person('张三',18)
console.log(p1);
p1.sayhi()

let p = objectFactory(Person,'张三',18);
console.log(p);
p.sayhi()
console.log(p instanceof Person);



// new Person(...)->function [[constructor]]->{}&&this->{}->[[call]]
// ->{}。proto__ ->Constructor.prototype -> return {} 
// add函数，3个参数
// add.length 3
function add(a,b,c){
    return a + b + c;
}

add(1,2,3);
function curry(fn){
//fn ? 是参数 最终要执行的功能    也是闭包中的自由变量  词法定义环境
// curry 函数 包装fn,慢慢收集参数
// ...args 可以表示所有的参数  自由变量
    let judge = (...args)=>{
        //es6 reast 运算符
        //在任何时候都可以访问到定义时候的fn 
        if(args.length == fn.length)
        {
            // 退出条件
            return fn(...args)
        }
        return (...newArgs)=>judge(...args,...newArgs)
    }
    return judge;
}
// 柯里化  手写curry 函数
let addCurry = curry(add)
// 逐步的去获取函数需要的函数，当到达fn需要的参数数量时，执行结果。
console.log(addCurry(1)(2)(3));

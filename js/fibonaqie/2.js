// 如何用闭包优化fib 
// 记忆功能
function memorizefib(){
    // 这里形成了闭包
    // 1.函数嵌套函数
    //3 可以访问自由变量
    const cache = {};// 存储
    return function fib(n){
        if(n <= 1)return n;
        if(cache[n])return cache[n];
        cache[n] = fib(n - 1) + fib(n - 2);
        return cache[n];
    }
}
// 2.内部函数可以在外部访问
const fib = memorizefib();
console.log(fib(100));

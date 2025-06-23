// 自顶向下 f(n) -> F(n-1) +f(n-2)->画树形结构 （方程不明显，有利于推导）
// -》重复计算，函数入栈太多 -》退出条件


const climbStairs = function (n){
     if(n <= 2) return n ;
     return climbStairs(n - 1) + climbStairs(n - 2);
    
}

console.log(climbStairs(4));


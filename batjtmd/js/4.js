// 全局的   js 代码在执行之前会有一个编译
// 变量提升了
console.log(vale);

var a;
a = 1 ;
if(false){
    var vale =1;// 申明变量            
}
// undefind 有
console.log(vale);


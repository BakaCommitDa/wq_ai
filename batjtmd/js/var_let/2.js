// 一句代码
// v8引擎
// 变量提升
// 编译阶段
// 执行阶段
// 全局作用域中的变量
// window？ 前端方式来运行
var a = 10;
// console.log(window.a);//ReferenceError: window is not defined  没有window
console.log(global.a);//node 里的顶层对象



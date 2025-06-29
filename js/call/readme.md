#  手写call

- 手动指定函数内部的this
- 传参 一个个    apply 数组
- 第一个参数是null或者undefined  this ?
  严格模式报错
- 应用场景的区别
  - call apply  立即执行的，区别是参数的传递方式，可以互相使用
  - bind  延迟执行



##  手写 call
  call是属于所以函数的,,Funtion 原型上的方法
  gretting.call()


## 包含的技能点
- 原型 Function
- 函数参数的理解
  context,rest运算符
- context 为空null,undefine ->window
- 在context 上挂载方法，轻松实现函数内部的this指向 context
   js 动态性 污染了contetxt
   es6 symbol 唯一值, 不会有覆盖context的属性
   delete context上的方法
- return 返回值
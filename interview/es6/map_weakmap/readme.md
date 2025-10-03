# map weakmap

- es6 新增的数据结构  作用企业级大型语言需要的内置数据结构

- key 可以是对象

- map（强）, weakmap(弱)

## 垃圾回收
- 也是一套程序，也是语言底层的关键机制
- 内存的动态分配  由操作系统管理
- 引用计数
- map强引用
- key = null, map = null 释放内存
- global.gc(); // 手动触发垃圾回收
    node --ecpose-gc为运行方式

- Map ,Set 需要手动去考虑内存的开销
    weakMap、weakSet 弱引用自动实现
    global.gc();

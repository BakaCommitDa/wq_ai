# type 和 interface

- 相同点
    都可以来声明类型， 自定义类型

- 不同点
    当我们要写继承类的时候， interface 只要extends就好
    type 使用的是& 并集

- interface 支持多次声明。。， 合并
    type 不可以

-  type 可以用于定义基础类型、联合类型、元组类型等
    interface只能描述对象结构(函数、类)


- type支持简单类型的别名， interface 不支持

- interface 和 type 在声明函数类型是有区别
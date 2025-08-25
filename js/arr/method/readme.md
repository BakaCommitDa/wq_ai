# 数组是的方法

## 分维度来回答，带上业务场景。

- 是否修改原数组， 非纯函数， 有副作用。
    push/pop/shift/unshift 栈/队操作
    shift/unshift 性能差， 移动元素 （数组是连续）
    splice(删除/插入/替换)
    splice(start,deleteCount,item1,item2,....)

- es6  新增方法
- b遍历/查找类/转换类/拼接类/统计类

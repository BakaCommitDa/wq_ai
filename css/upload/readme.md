# uploader 大厂必考


- 源码学习是核心
  - 高质量的代码和技巧
  - 思维方式
- 技能点
  - 语义化标签
  - 使用BEM命名规范
  - 弹性布局
  - stylus  变量,模块化
  - 伪元素
- weui-uploader 源码
  - weui-uploader 外面严谨的套上了  .weui-cells
  - .weui-cells 移动端收集用户数据或操作表单表格
   - .weui-cell 每个表单元素
     - .weui-cell__bd  内容

- -webkit-overflow-scrolling: touch
  滚动更敏感，感知touch
  - webkit  实验阶段
     chrome 浏览器内核的代号  使用起来
     在移动端没有微软    只有苹果，安卓都是（wekit）,支持
- 变量组成了weui 主题风格
- stylus & 应用上一层  伪类，伪状态
- float 布局
  - 早于flex的布局方案
  - 会离开文档流
  - float:left , float:right 左浮  右浮  两列式
  - 如果一直float:left 多列
  - 一行不够，会自动换行

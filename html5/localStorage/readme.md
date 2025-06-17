# localStorage

- 全局安装stylus
   - npm install -g stylus
   - stylus --version   //0.64.0

- stylus 是何物
  - 是一个css预处理器
  - 更快，更专业
安装一个叫stylus的插件
- .styl 后缀的文件


- stylus 是css 的超集
    但浏览器还是只认css，要编译一下(stylus common.styl -o common.css)
    用stylus -w common.styl -o common.css实时检测stylus文件的变化，自动编译为css文件
  - box-show 盒子的立体感觉

- css 有些属性会直接继承
  如果没有，每个都要写一遍 无法接受
  默认16px 颜色黑色 
  body color 子元素 颜色继承body 
  有些也不是继承


- background-size:cover;等比例缩放，裁剪  重点在盒子
contain 重点在背景，完整显示背景图片


- css 如js 一样
- 模块特性
    tab 缩进 自动补全css的前缀
    模块和作用域的概念

ipconfig拿到局域网地址
- 什么叫viewport user-scalable=no
    它指示浏览器不允许用户通过缩放来改变页面的显示比例，确保网页在移动设备上以设计师或开发者设定的最佳视图展示，保持布局的一致性和设计意图的完整性
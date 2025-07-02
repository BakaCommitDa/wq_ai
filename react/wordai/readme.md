# 智能前端之单词学习
- 产业和商业模式 
  - 学单词
  - 拍照记单词
    - 交给多模态模型 word
    - deepseek  aign 例句
    - tts  发音
- focus
  拍照背单词，用单词
- 解决一些特定的效率性、创新型APP


- npm init vite
  vite 是工程化脚手架，构建工具
- npm i 慢了点
  react... 项目依赖
  npm config get registry 看源
  npm config set registry https://registry.npmmirror.com
  将 npm 的默认包镜像源切换为国内的 npmmirror 镜像（又称为 淘宝 NPM 镜像），这个操作非常常见，尤其在中国大陆地区，可以显著提高 npm install 的下载速度。

  pnpm 代替npm
  不同的项目中 重复去安装了react
  react 等包放到一个地方，如果之前安装过，链接，只需要安装一次
  npm install -g pnpm   全局安装pnpm
  pnpm --version  版本号


## 项目中一定要安排的技能点
- pnpm
- react  思想
  - 数据状态 useStae
  - 数据驱动
  - 响应式 数据状态变化，视图会自动更新
    - 不用频繁操作DOM,只需要关注业务
- 业务
  - 图片上传
    - 图片预览
- 组件化设计 
  - PictureCard
- 性能优化
  - linear-gradient 代替图片做背景
- 用户体验
  - 上传图片的功能，预览功能
  - 无障碍访问
     label for + input#id 
- es6 新特性
  - 可选链运算符
- html5 功能
  - file  文件对象
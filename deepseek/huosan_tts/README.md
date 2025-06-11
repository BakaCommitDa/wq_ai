# 智能前端之语音
- AI时代新的交互体验，语言交互
  虚拟数字人  AIGC-》 语音



- 敏感信息怎么保护？ 不上传
  .gitignore 哪些文件不用提交到远程 仓库也不进入
  node_modules/ 这个文件太大了  也没有必要提交  npm i 



- 环境变量
  .env.local  本地环境变量  以 . 开头  放着本地项目需要的key
  添加到.gitignore里面  不会上传到远程仓库


- 单向数据流
   input value {prompt}
   默认保持数据状态和界面的统一
   UI = f(state) state 驱动界面 
   onChange 修改


- base 64格式
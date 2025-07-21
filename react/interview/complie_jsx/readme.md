- JSX ?
    - JSX 不能独立运行
    - vite 工程化
          jsx -> React.createElement(本质上是其函数的语法糖，二者在功能上是等价的)
    - React 环境中、
    npm init -y  快速创建 Node.js 后端项目

- babel 
    Make JavaScript Greate again!
    大胆使用JS最新语法，不用等待
    es6 promise - > es8 async await
    let 转译-》var
    ()=>{}  转译成->function(){}

./node_modules/.bin/babel 1.js -o 2.js

- 编译的流程
   - pnpm i @babel/cli @babel/core -D   安装(-D 用于将包安装为 开发依赖)
        @babel/cli babel的命令行工具 
        @babel/core babel的核心工程
        babel 负责JS 转码 
        -D 开发阶段的依赖 dev
        上线后是不用的
    - ./node_modules/.bin/babel
        转换的规则  .babelrc
        react -> IOS 代码
        es6+ -> es5
        JSX -> React.createElement
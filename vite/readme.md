# 工程化

- 哪些问题？ 工程一揽子方案
    - web server5173 端口 http 模块？ express 框架
        index.html 作为首页
    - tsx -> jsx -> babel -> js
    - styl -> css 文件
    ...
    基础， 后方工作

- 怎么介绍vite
    - 兼容性问题
        IE 11 不支持
    <script type="module" src="/src/main.jsx"></script>
    VITE 是一个基于原生ES模块(import 解析 ,Webpack, 很多还不支持esm)
    通过按需编译实现急速冷启动（快）与 热更新的新一代前端构建工具
    
    - 为什么快？
        - 基于原生ES模块,不需要打包所以文件， 按需加载

    main.jsx  入口文件  ， 模块的依赖
    main.jsx -> App.jsx -> App.css + react + components + router + api + store 
    整理这些模块之间的依赖关系(链条)


- webpack 
    由于要支持老旧浏览器， 不使用esm， 要打包
    a->b->c->d
    不用模块化
    先d 编译js 最上面
    c 编辑 放到d下面
    b 放到c下面
    a 放到b下面
    一起打个包，成为一个文件

### webpack 和 vite 的区别
- index.html 没有type="module" 怕浏览器不支持esm
    要整理依赖关系，打包文件，慢
- 适合大型项目， 丰富的配置
    - entry , output 这是核心
    - plugins
        html-weebpack-plugin html template 在哪？
    - devServer
        http server 细节
    web bundler  一切静态资源皆可以打包
    vite 快， 不需要打包， 但是有兼容性，生态、定制性不如webpack
    webpack 打包 慢一点， 但是兼容性好，生态丰富，可为大型项目定制，有很长时间的业务验证。
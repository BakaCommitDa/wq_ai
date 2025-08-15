# deep router


- router
- 401
- 301/302 重定向
- 404
- 性能优化

- SPA 带来了优质的用户体验
    - 块
    - 不会白屏，不依赖于http 去服务器请求页面
- 前端首先加载路由，SPA应用
   React
   ReactRouter
   Redux
- 导航 封装
- 路由懒加载
   lazyload
   - /home
   - /about About
    只加载当前需要的
    其他的不加载
    首页
- es6 model 引入模块并且会执行
- 懒加载的流程
    - import es6 加载并执行太多的非必要组件
      影响首页的加载速度，特别是页面多的时候
    - 倒入lazy,Suspense
        lazy  高阶组件（返回值是一个组件）
    - import('./pages/Homme') 动态加载
    - <Route/>匹配到 才会动态加载响应的组件
    - Susepense  在还会加载前 fallback   
    - 
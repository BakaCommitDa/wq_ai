# 缓存
## UR 输入到页面显示
- 知识体系
- 多进程多线程架构是前提
- 输入网址并解析
    如果输入非结构字符串， 搜索关键字 
    有结构的字符串 
    协议://域名:端口/path/:params?qs#hash
    http(s)
    web 80 nginx proxy 3000 
    443 https 

- 浏览器解析协议、主机、端口、路径等， 并**构造**一个http请求
    - 发送请求前 ， 根据请求头的expires 和 cache-control 来判断是否命中强缓存策略
        httpS://www.baidu.com/index.js + 请求头 
        缓存文件+请求头在一起（文件的属性一样）
    - 强缓存 
    Expires 过期时间  http 1.0 缺点是用户时间不准
        响应头canahe-control + 文件本地缓存，在经过本地缓存，不用请求
        直接用本地缓存内容 1.1 升级为cache-control

    - 协商缓存
        强缓存没有命中（过期），这个资源在服务器端也不一定修改了，怎么样对一下

    Cookie  
    url 背后的 请求行、请求头、请求体
    同一主机的不同端口 对应的是不同的程序或服务
    dns -> ip 地址 80->http  443->https  3306->mysql 
    - 补全url
    比如输入的是badiu.com  -> https://www.baidu.com/
    - http://www.baidu.com 不安全
        1 正在进行
        2 成功
        3 跳转
        4 用户
        5 服务
        307 跳转 307 Temporary Redirect
        Location: https://www.baidu.com/
        再请求一次
        永久跳转    301 Moved Permanently   GET请求                308 Permanent Redirect
        临时跳转    302 Found                               307 Temporary Redirect
        
        301/302 只支持GET  哪怕你的请求不是GET,也会改成GET
        307/308 各各种方法，不会改 






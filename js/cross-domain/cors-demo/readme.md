# 进阶跨域方案 cors


- 日常用的最多的跨域解决方案
    JSONP 不跨域
    cors 跨域的  
    浏览器会发送**CORS**请求，如果服务器端的响应头设置了Access-Control-Allow-Origin,
    后端实现了CORS,就可以跨域了
    *
    白名单


nodemon main.js 热更新


    - 简单跨域请求
        GET/POST/HEAD 简单设置一下Access-Control-Allow-Origin 就好
        Content-Type text/plain multipart/from-data
        application/x-www-form-urlencoded

    - 复杂跨源请求
        其他的方法 安全升级
        - 预检请求
            200
            Access-Control-Allow-Methods
            Access-Control-Allow-Headers


            METHOD OPTIONS
        - 真正请求

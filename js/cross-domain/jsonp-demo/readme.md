# 封装的JSONP

- 只能解决GET 请求的跨域问题
    http://localhost:3000/say?callback=biao
- 需要后端配合
    后端的输出方式要加padding
- 不太安全
    全局挂载了一个show callback 函数 容易被黑客利用


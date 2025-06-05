# deepseek
- 大模型在哪里？
  远程
  http api 请求
-LLM 服务 
 像api 一样
  fectch 赋予了 JS新生命

## WebLLM
智能前端的战场

# 运行项目
直接在浏览器中打开`index.html`文件即可


## 服务器端返回
- 输入url 或者点击一个链接(比较死板)
- 向服务端发送请求
- node/java  根据请求 ，去数据库取数据，生成html字符串
- 返回html字符串


## fetch 请求
- 滚动到底部后，加载更多数据 是web 2.0 富应用体验
  看到新的内容
- fetch url 
  - 不需要刷新页面，主动去服务端取一次， 用DOM 更新页面
- 点赞的时候？
  js fetch  发送api 的点赞请求


- LLM AI时代
  fetch 取来大模型的能力，智能前端时代


## http 请求 
   - 请求行  GET(方法) http://www.aidu.com(地址) 
      POST  https://api.deepseek.com/chat/completions
   - 请求头 
     设置各种头部信息
     {
      Content-Type": "application/json，
      Authorization": Bearer 123456 请求凭证

     }
  - 请求体
    GET 没有请求体
    POST 可以有请求体
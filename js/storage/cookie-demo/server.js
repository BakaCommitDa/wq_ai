// node 后端
// node  内置的核心模块
// js 在命令行运行
// js 两种模块化方案
// require node  早期模块化commonJS
// import es6 更先进的模块化方案
// old  module
// node 受欢迎  中小项目开发
// 端口 -》 某个服务
// 3306 mysql 服务     对应着进程(资源)   线程（执行）
// domain （loacalhost）-> ip 地址 (127.0.0.1)
// -> 对应着某台设备 -》 port 设备上的某个服务或者进程
// 1234 8080 端口占用
// 一台设备上可以很多端口使用，很多http服务 多个网站
// 不要使用一些特殊端口
const http = require('http');
const fs = require('fs');// file system
const path = require('path');// 路径模块


const server = http.createServer((req, res) => {
  // res.end('hello http server');
  // http 基于请求响应的协议
  // 路由 Method + url 构成  定位了服务器端的资源
  // 为了资源 
  if(req.method == 'GET' && (req.url == '/' || req.url == '/index.html')) {
    // res.end('hello http server');
    // path.join 路径拼接
    console.log(__dirname,path.join(__dirname,'public','index.html'));
    //nodemon 是一个 Node.js 工具，用于监控文件变化并自动重启 Node 应用。
    // 它非常适合在开发阶段使用，因为当你修改了代码保存后，它会自动重新启动服务，无需手动停止再运行
    // 用npm i -g nodemon  监控文件的变化  自动重启node服务  不用每次都手动重启
    // nodemon --version 看看版本号
    // nodemon server.js
    fs.readFile(
      path.join(__dirname,'public','index.html'),
      // 异步 callback    
    (error,content)=>{
      // 前端体验为主
      // 后端稳定为主
      if(error)
       { res.writeHead(500);// 5XX 服务器错误
        res.end('Server error');
        return;
      }
    // 不只是html,css ,js,jpg
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(content);
    }
    
  )
  }
  // 后端路由，暴露资源
  http://localhost:8080/style.css?a=1&b=2
  // 协议http://  localhost 域名   端口      /style.css  路径path    queryString
  if(req.method == 'GET' && req.url == '/style.css'){
    fs.readFile(
      path.join(__dirname,'public','style.css'),
    (error,content)=>{
      if(error){
        res.writeHead(500);
        res.end('Server error');
        return;
      }
      res.writeHead(200,{'Content-Type':'text/css'});
      res.end(content);
    })
    return;
  }

    if(req.method == 'GET' && req.url == '/script.js'){
    fs.readFile(
      path.join(__dirname,'public','script.js'),
    (error,content)=>{
      if(error){
        res.writeHead(500);
        res.end('Server error');
        return;
      }
      res.writeHead(200,{'Content-Type':'text/javascript'});
      res.end(content);
    })
    return;
  }
})
server.listen(8080);
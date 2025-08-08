// commonjs

const http = require('http');

// js 异步 异步无阻塞
// node 天生性能好 相同用户访问数，使用的服务器少，更便宜
const server = http.createServer((req,res)=>{
    if(req.url === '/api/hello' && req.method === 'GET'){
        console.log('///');
        res.writeHead(200,{
            'Content-Type':'text/javascript'
            // 'Content-Type':'application/json'

        })
        // JSON 
        const data = {
            code:0,
            msg:'字节，我来了'
        }
        // json with padding
        res.end("Callback("+ JSON.stringify(data) +")")

        // res.end(JSON.stringify({message:'hello world Node.js backed'}))
        // res.end("console.log('hello world Node.js backed')")

    }else{
        res.writeHead(404)
        res.end(JSON.stringify({message:'404 Not Found'}))

    }


})

// 服务器在8080 端口上运行
server.listen(8080,()=>{
    console.log(`Server is yunning on port 8080`);
    
})
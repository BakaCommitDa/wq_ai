// js 主动的去拉取http 接口
// web 1.0 时代 html/css/js  服务器段java 返回的 js 只做简单的交互
// web 2.0 时代 js 主动的请求后端服务器 动态页面
// document.addEventListener('DOMContentLoaded', function() {
//     console.log('WebLLM 页面已加载');
//     // 这里可以添加更多的 JS 功能
// });
// fetch('https://api.github.com/users/BakaCommitDa/repos')
//  .then(res => res.json())
//  .then(data => {
//     // console.log(data);
//     document.querySelector('#reply').innerHTML += data.map(repo=>`
//     <ul>
//     <li>${repo.name}</li>
//     </ul>
//     ` ).json('')
// })
// console.log('WebLLM 项目已启动');
// js 主动的去拉取http 接口
// web 1.0 时代 html/css/js  服务器端java 返回的 js 只做简单的交互
// web 2.0 时代 js 主动的请求后端服务器  动态页面 
// fetch('https://api.github.com/users/shunwuyu/repos')
//   .then(res => res.json())
//   .then(data => {
//     console.log(data);
//     document.querySelector('#reply').innerHTML += data.map(repo =>`
//     <ul>
//       <li>${repo.name}</li>
//     </ul> 
//     `).join('')
//   })


// 当大模型 API  服务
// 以chat 的方式 AIGC 生成/完成 返回的内容
// 由openai制定的
// 请求行
// 命名
// 微博LLM  web 的底层是http协议
// llm api 服务 
// AudioParam.deepseek.com 二级域名 LLM服务以api的方式提供 
// https 加密的http 更安全
// chat 聊天的方式 messages 
const endpoint = "https://api.deepseek.com/chat/completions"
//请求头
const headers = {
    //内容类型
  "Content-Type": "application/json",
  //授权
  "Authorization": `Bearer sk-7a2139474cd74d59bda31408dbd85920`
}

//请求体
const payload = {
  model:'deepseek-chat',
  messages:[
    // chat 三种方式
    // 1. 系统角色 只会出现一次  设置系统的角色  开始会话时
    // 2. 用户角色 user  提问 
    // 3. 助手角色 assistant
    {role:'system',content:'You are a helpful assisant.'},
    {role:'user',content:'你好 Deepseek'}
  ]
}

fetch(endpoint, {
    method: 'POST',
    headers: headers,
    //http  请求传输只能是字符串， 二进制流
    body:JSON.stringify(payload)
// 请求 + LLM 响应生成需要花时间
// http 是基于请求响应的简单协议
// 返回的也是文本或二进制流
}).then(res => res.json())
// 解析返回的json 数据  也要花时间
.then(data => {
  console.log(data);
  document.querySelector('#reply').innerHTML += data.choices[0].message.content
  
})
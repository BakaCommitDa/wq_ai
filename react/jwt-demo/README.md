# jwt 登录鉴权
- isLogin , user  全局状态   zustand
- mock 登录模拟
    pnpm i vite-plugin-mock 安装
    - apifox  api 请求模拟
    不用写页面，就可以发送请求
    curl 

- 会话授权
    - 服务器知道我们是谁？
    - http 是无状态的
        - 请求头
        - server 种下一个cookie  唯一 sid 值  sid => user
        - 每次从请求中  从 cooki读取sid
        - 服务器就知道我们了  

    - 登录和用户鉴权方案JWT   JSON Web Token
            - {id：112，username:'帅的惊动党中央'，level:'4'...}  user  JSON的数据
            - 通过一种算法  生成一个hash 串
            - token  服务器令牌
            - 带上token 
            - decode 解码
                {id：112，username:'帅的惊动党中央'，level:'4'...}
        pnpm i jsonwebtoken 安装
    
- jsonwebtoken
    jwt 鉴权的库 
    sign  颁发一个token  user
    verify 验证token  user
    - pnpm i jwt
    - import jwt from 'jsonwebtoken'
    - sign
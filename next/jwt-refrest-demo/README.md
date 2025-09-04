# next.js 全栈项目

- users & posts 表
- jwt 双token 鉴权
- 虚拟列表
    AI 爬虫 掘金100条数据
- 大文件上传
- ai 工程化
    流式输出
    function Tool
    mcp
- ai 搜索

## 双token
单token 存储在localStorage 长期，第三方拦截， 不安全
双token
安全 + 无感刷新登录
- accessToken 校验身份 重要 时间有效期变短 h小时位单位 cookie
    过期怎么半？
- refreshToken 刷新 7d 时间长
    没有过期， refreshToken  发到服务器 / api/auth/refresh
    返回新的accessToken  无感刷新
- refreshToken 过期后， 去登录


## 开发流程
- .env
    mysql url
    create database demo; 建立数据库
- prisma 初始化    npx prisma init
    orm 工具
    object relation mapping
    User(表) => User类
    一行     =》 new User() 实例
    底层数据库操作 映射 高级的面向对像操作
-Prisma Schema 是定义数据库模型、关系和数据类型的配置文件，用于生成类型安全的数据库客户端。
    数据库的设计图
    比navicat 好的地方， schema + git 留下数据库和修改的历史
    文档型的，可以追踪。留底 

- 数据库迁移
    npx prisma migrate dev --name init
    生成数据库的表
    生成数据库的客户端

- Model 表的映射模型 
    @@map("user")  指定模型对应的表名
    posts       Post[]      一对多的关系
    createAt    updataAt  primsa  自动维护
    @id 主键  @unique 唯一索引
    Model User {
        columns name type    @default
        索引
        relation
    }
    
    - migration 迁移
        有记录


- restful API
- lib/  复用的js 模块
- regexp
    前端，后端后要会正则
    /^.+?[]{}$/   test
    ^ 开始  $结束  ^$严格匹配整个字符
    . 都匹配，一个字符
    ？ 0次或一次
    + 一次或多次
    * 0次或多次
    [] 范围
    {} 长度
    {n} 长度为n
    {n,} 长度至少为n
    {n,m} 长度至少为n，最多为m

- bcryptjs 加密js 模块  单向的加密算法 （不能被解密）
    register  加密一次
    login    再加密一次
    比较  两次加密后的字符串是否一致

- 状态吗
    - 200 ok
    - 201 created
    - 400 bad request
    - 401 unauthorize
    - 403 forbidden
    - 404 not found
    - 409 conflict
    - 500 inter server error


- middleware 的概念 
    中间件  配置一个列表
    /dashboard 后台 
    Middleware 是中间件，用于在请求和响应之间执行预处理逻辑，如日志、认证、数据解析等。
    - 配置一个需要登录的页面数组
    - some startwith
    - response.next() 放行
    - response.redirect() 重定向 跳转

    - 通过jwt verify方法拿到payload后， 添加了自定义的请求头
        x-user-id 
        后续页面可以拿到这个值

- JWT 的构成
    - 头部
        签名算法 HS256
    - 载荷
        {userID:...}
    - 签名
        secretKey 

- cookie
    httpOnly:true
    HttpOnly 可防止 JavaScript 访问 Cookie，有效抵御 XSS 攻击导致的令牌泄露。
    要在服务器段设置
    SameSite 可防止跨站请求伪造（CSRF）攻击，限制 Cookie 在跨域请求中的自动发送，提升安全性。

- 后端安全和性能
    - 一定要做容错处理
        try{}catch(){}finally{} 
    - 释放数据库对象
- prisma client 的CRUD方法
    prisma.user.create()
    prisma.user.findUnique()
    prisma.user.update({
        where:{},
        data:{}
    })



## 大文件上传
当文件比较大的时候，由于各种原因，容易失败，而且上传很慢。
一旦失败，需要重新上传，会让用户不开心。

采用分片上传策略（可以并发，怎么做并发限流），讲文件切分为多个小块并行上传，提升稳定性和效率。
上传前通过web Worker 计算文件整体以及分片的hash ,向服务器校验，若文件已存在，则直接秒传。
前端记录上传进度和已成功分片，支持断电续传，避免重复上传。服务器按序接受分片，存储后进行合并，
并检验最终文件的完整性，结合唯一标志和分片索引，确保上传可靠，整个过程配合进度条和错误重试机制，
提升用户体验和系统健壮性。 

- worker hash 计算

- 性能优化
    上传文件的处理函数 handleFile 使用useCallback 缓存， 避免重复创建

- typescript 的使用
    - 主线程和worker 线程间的通信， 数据约定
    HashWorkerIn
    HashWorkerOUT
    as HashWorkerIN 断言
    非空断言 !


- useRef 的高级使用场景
    可变对象
    - dom对象
    - 对象
    -值
    AbortController  取消请求对象， 推迟到上传，再实例化
    暂停的值也用 ref 保存， 


- es6 特性
    - Set 已经上传的分片索引
    - ？？ 空值合并操作符
    - Promise.all 并发 
    - Map 和 Set

- restful api 
    - uploadChunk   POST /api/upload/chunk   url 设计
    - 自定义请求头 
    这里的 headers 通过自定义请求头传递元数据（文件哈希、分片序号），使服务端能在不解析请求体的情况下快速识别分片归属和顺序，提升处理效率和可扩展性。
    只解析请求头就可以判断是否已上传的chunk   更快

## 项目的难点
- 分片上传的并发控制
    promise.all + 递归
    并发限流的核心是：一开始只启动不超过 MAX_CONCURRENCY 个工人函数，每个工人执行完一个任务后会递归调用 next()，继续从队列取下一个任务，从而保证始终只有固定数量的工人在运行。这样既避免了同时创建过多 Promise 占用资源，又能充分利用并行度；等所有工人都把队列清空才 resolve，Promise.all 就能精确等待整个批次完成。


    path.join 拼接路径字符串，不解析；path.resolve 从右到左解析，遇绝对路径替换
    ，返回绝对路径


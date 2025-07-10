## hooks todos


- 安排个css 亮点
    - stylus
        是css的超集
    - 为什么能直接用，拥有vite教师节
        stylus  预编译  只需要安装stylus  vite 直接编译    
                pnpm add -D stylus 安装
        vite来自vue 社区
    - react 组件设计
         - 开发任务单元
         - 设计组件
                界面功能  状态  响应式
                - 新建todo 表单  
                - 修改  列表
                - 删除 
         - 按功能划分  粒度
              - form 表单
              - list 列表
                    - Item 列表项 组件 有利于维护和**性能**

- 字体
     - 设置多个，设置的支持（本地包含，没有就默认）
     - 对苹果设备进行优化  -apple-system  前端要负责用户体验，字体也是美感，体验的一部分

- rem 
   - 相对单位
   - 移动端的重要单位 px  不要用了  绝对的
      移动端  宽高不定的 rem（html font-size）  vw/vh(viewport 视窗), em 相对单位
      使用相对单位，可以在使用设备上适配 
      em 相对自身的font-size 等比例

- props  组件通信
   - 传递状态  
   - 传递自定义事件
   - 直接解构
        const {
            todos,// 任务
            onAddTodo// 添加
        }=props  单独解构

- 数据绑定
    - 变量  修改值
    - 数据状态
         - Data  binding **数据**绑定，  jsx是静态的
          {} 数据绑定
         - 数据和界面状态的统一
             - 界面由数据驱动
             - 数据和界面状态的一致性
        - 响应式的数据更新 


- vue 和react区别
    - vue好入门，api好用
    - react 倾向于原生JS  入门难
         - hooks?
    -vue 中 <input v-model="text">  双向绑定
    - react 中 <input value={text} onChange={e=>{setText(e.target.value)} /> 
    react   坚持 单向绑定

- 本地存储
    - localStorage    html5
       key:value  存储

       localStorage.setItem('title','本地存储')
       localStorage.getItem('title')
       localStorage.removeItem('title')
       window.location.href='http://www.baidu.com'
       window.history.go(-1)


    - BOM   Brower  Object Model 
    - DOM  Document Object Model
- 本地存储
    - localStorage 和 cookie 有什么异同
    假如你在面试字节，请问如何介绍locaStorage 和cookie 相同点，区别， 用table 列出来
     - http 无状态，head cookie 带上
     - cookie 太大, 影响http 性能  4kB
     - cookie 前端 ，后端都可以设置
       过期时间
       domain  隔离
     - localStorage 只在浏览器
        domain
        todos
        5MB
     - IdexDB  数据库  GB


## 自定义hooks
    - 自己定义的
    - use
    - 某一项功能
       不是简单函数的封装
       响应式的状态
       effect 
       todos 

- 自定义hooks
     - 现代react app 的架构一部分
     - hook目录
         自定义hooks
         框架common部分
         业务定制 ahooks

    - use开头
       把state,effect,逻辑封装复用
    - return 
        todos,
        setTodos,
        addTodo,
        onToggle,
        onDelete
        函数式编程思想的体现
    - 组件更加干净 更加聚焦于模板渲染
    - 全面hooks函数式3编程

- 两个遗憾
   - ../../ 路径山路18弯
            resolve: {
            // 别名
            alias: {
            '@': path.resolve(__dirname, './src'),
            },
        },

    - toggle,delete  跨域组件层级有点多，  useContext

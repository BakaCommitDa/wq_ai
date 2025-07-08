# react 事件机制
- js 事件机制
     - 异步
     - 监听一个事件
        - addEventListener()  
        DOM2  事件 
        <a onClick="doSomething()"></a>
        - DOM 1?  DOM 版本，  没有去做事件升级
    
    - addEventListener(type, listener，useCapture？)
    - 回调函数callback 是异步处理的称呼
    - promise then 
    - async await 
    监听器 
- useCapture false 默认值
页面是浏览器渲染引擎按像素点画出来 png
     先捕获  document-> 一层层去问
            点了谁?
           先触发父元素
     event.target 
            捕获阶段，拿到event.target (触发事件的真实 DOM 元素) 
     冒泡
        event.target  冒泡到html   回去到根
        事件让它在冒泡阶段执行
        在哪个阶段执行

## 事件委托优势 delegation
- 性能优化
    - 极致将委托给外层元素
    react  大型项目开发
    给我们的事件节点event.target 添加一个唯一属性
- 动态节点的事件
  滚动当底部，一次新增一堆的新元素
  事件委托可以有效解决
- 同一元素同一事件注册多次
     - dom 节点
     - event  type
     - 监听器(回调函数)   event  loop
         event  对象
     - useCapture 

     - event.preventDefault   阻止默认行为
         form submit 
         a 
     - event.stopPropgation


- 用户交互的便利体验问题
    - toggle按钮
    - 点击页面任何空白地方可以关闭   方便
    - 显示区可以交互，stopProgpagation

- SyntheticEvent 合成事件
     - 委托 #root
          性能优化框架帮我们做
     - 事件池 Event pooling
          事件对象的回收利用
          大型密集交互的应用
    - 最近的版本中又可以安全使用了         
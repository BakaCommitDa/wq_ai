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
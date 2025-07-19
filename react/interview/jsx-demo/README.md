# JSX 考点
- 何为JSX
    JS in XML(HTML是XML的一种形式)
    react 推崇的JavaScript 语法扩展，允许在JavaScript 中嵌入HTML结构(function return 组件)
    常用于React的定义，使得UI结构更直观易读
    React的一大优点特性
- JSX可以直接运行吗？
   不可以
- .styl -> stylus编译-》.css
<ul>
  <li key={todo.id}>{todo.title}</li>
  <li key={todo.id}>{todo.title}</li>
  ...
</ul>
- JSX === React.createElement(tag,props,children)
    document.createElement('ul')
        .appendChild(document.createElement('li'))
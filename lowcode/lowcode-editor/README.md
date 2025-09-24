# Lowcode Editor
- npx create-vite lowcode-editor
  react + ts
- editor 组件
  - 负责低代码编辑器
- tailwindcss 

- pnpm i allotment
  可调整大小的分栏布局
  - 左侧 物料区域
  - 中间 编辑区域
  - 右侧 配置区域

- 模块化开发
  - components
    - header
    - Material
    - Setting
    - EditArea

- zustand 状态管理
   - json 数据， 低代码编辑的本质

## 阿里的Abtd 组件库
  蚂蚁金服

## 物料区组件
  可扩展的 组件库
  - Container


## 第一次总结
使用了aisuada阿里低代码编辑器，发现核心是一个json的数据结构。
一个通过children 属性串联的组件对象树。
alloment split pane 布局， 用tailwind 写样式， zustand来全局状态管理
数据结构就是树，不复杂，但是是低代码编辑器的核心
- 物料区
- 编辑区
- 设置区


## TypeScript 类型
Record<string, any> 是 TypeScript 中的一个工具类型，它表示一个对象，其
所有属性的键都是字符串类型，而属性的值可以是任意类型（any）。

## 拖拽生成
- react-dnd 是一个用于在 React 应用中实现拖放（Drag and Drop）功能的流行库，
通过提供可组合的 API 和后端抽象（如 HTML5 或触摸）来简化复杂拖拽交互的开发。
- 根上包着

## 遇到的问题
- useDrop 时候会插入多次 
- useDrop 多次重复
  违反了dry原则
  封装一下
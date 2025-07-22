# 性能优化hook

- 父子组件渲染顺序
    - 执行的时候先外到内   组件树
    - 完成渲染 完成组件的挂载 先内到外 
- Button  组件该不该重新渲染？
     - 父组件局部，count  改变和Button组件没有关系
          Button  JSX

     - 性能优化 
     memo 是一个高阶组件（Higher-Order Component），用于优化性能。它的主要作用是通过记忆化（memoization）技术来避免不必要的重新渲染（re-render）。当一个组件的属性（props）没有发生变化时，React 会跳过对该组件及其子组件的重新渲染过程，从而提升应用性能。
        响应式和性能  非常好
        切分组件  热更新
        组件之间独立
        子组件 React.memo
        createContext  useContext  所有状态全部给一个 Context 好吗
        不好，性能  所有状态都是通过一个reducer 生成
     
-组件划分的粒度
    - 组件拆分  单向数据流
    - 就负责渲染的子组件（props + jsx）
    - 复用，好管理之外 提升性能
    - 状态更新后组件函数要重新运行
    - useCallback + React.momo
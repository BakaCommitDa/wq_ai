import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [title,setTitle] = useState('');
  const [color,setColor] = useState('');


  console.log(count,'count');
  const handleClick = ()=>{
    // 异步  不是同步的
    // react  性能优化， 合并多次更新  统一处理
    // 重绘重排
    // 数据绑定的界面更新
    // JS 引擎 v8， 高速过路费    渲染引擎 Blink
    // setCount(count+1);
    // setCount(count+1);
    // setCount(count+1);
    // setTitle('hello')
    // setColor('red')
    // setCount 函数性更新语法 
    // 保证每个更新都基于上一个最新的更新
    // 界面的更像合并为一次， 
    setCount(pre => pre + 1)
    setCount(pre => pre + 1)
    setCount(pre => pre + 1)
  }

  return (
    <>
    <p>当前计数:{count}</p>
    <button onClick={handleClick}>+3</button>
    </>
  )
}

export default App

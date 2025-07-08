import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const handleClick = (e)=>{
  // 事件模块是项目，框架的核心部分，react  性能，封装，
  // console.log(e);// SynthticEvent 合成事件
  // console.log(e.nativeEvent);// 原生事件
  // 事件代理 #root + 自定义唯一值  叫合成事件
  // 框架帮我们完成了性能优化
    console.log('立即访问',e.type);
    setTimeout(()=>{
      console.log('延迟访问',e.type);
    },2000)
  
  } 
  return (
    // react 不能直接操作DOM,性能差  有点像高速  v8->渲染引擎
    // react 借鉴了DOM  0 行内的写法
    // 相似，学习成本  相似 ，react event 并不是原生事件，叫合成事件
    // onClick 不是onclick 不是字符串，而是事件函数绑定
    <>
      <button onClick={handleClick}>click</button>

    </>
  )
}

export default App

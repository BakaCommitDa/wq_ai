import { useState,useEffect } from 'react'
import Timer from './compentents/Timer'
import './App.css'

function App() {
  
    const [count,setCount] = useState(0);
    const [num,setNumber] = useState(0);
    const [repos,setRepos] = useState([]);
    const [isTinmerOn,setIsTimerOn] = useState(true);
    // console.log('组件函数开始执行');
  // // 正作用? 渲染组件
  // // 渲染组件后搞点副作用
  // // 生命周期

  // useEffect (()=>{
  //   console.log('组件渲染完了');
  // })
  //   // 生命周期函数
  // // 第二个参数是依赖项数组
  // useEffect(()=>{
  //   console.log('hahaha');
    
  // },[count])
  //   useEffect(()=>{
  //   console.log('123');
    
  // },[num])
  //   useEffect(()=>{
  //   console.log('678');
    
  // },[count,num])

    useEffect(()=>{
      // api 数据 动态的
    console.log('只在组件挂载时运行一次！！！');
    const fetchrepos = async ()=>{
      const response = await fetch('https://api.github.com/users/shunwuyu/repos')
        const data = await response.json()
        console.log(data);
        setRepos(data);
    }
    fetchrepos()
  },[])



  // 组件模板编译
  // 挂载到root节点上
  console.log('组件的模板编译');
  
  return (
    <>
    {count}
    <button onClick={()=>{
      setCount(count+1)
    }}>点我</button>
    <br />
        {num}
    <button onClick={()=>{
      setNumber(num+1)
    }}>点我</button>

    <ul id='repos'>
      {
        repos.map(repo=><li key={repo.id}>${repo.full_name}</li>)
      }
    </ul>
    {isTinmerOn &&<Timer />}
    
      <button onClick={()=>{
        setIsTimerOn(!isTinmerOn)
      }}>toggle timer</button>
    </>
  )
}

export default App

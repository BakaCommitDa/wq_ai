import React, { useState } from 'react'
import './App.css'
import NameEditComponent from './components/NameEditComponent.tsx';

function App() {
  // js 代码
  // const [name,setName] = useState('initalName');
  // typescript 代码
  const [name,setName] = useState<string>('inialName');
  // 单向数据流
  const setUsernameState = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setName(event.target.value);
  }


  return (
    <>
      <NameEditComponent username={name} onChange={setUsernameState}/>
    </>
  )
}

export default App

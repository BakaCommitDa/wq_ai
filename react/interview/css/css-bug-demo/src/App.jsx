import { useState } from 'react'
import './App.css'

// import 运行  路由懒加载
import AnotherButton from './components/AnotherButton.jsx'
import Button from './components/Button'
function App() {

  return (
    <>
      <Button />
      <AnotherButton />
    </>
  )
}

export default App

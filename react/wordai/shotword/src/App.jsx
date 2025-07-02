import { useState } from 'react'
import  PictureCard from './components/PictureCard'
import './App.css'

function App() {
  // JSX   react 有时  方便写HTML模板
  return (
    <>
      <div className='container'>
        {/* 自定义组件  字组件
        组件 html ,css,js 沙子，组合起来， 图片上传功能
        模块化， 复用，页面有DOM树-》组件树 */}
        <PictureCard />
      </div>
    </>
  )
}

export default App

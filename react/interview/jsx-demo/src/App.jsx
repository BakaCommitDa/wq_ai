import { useState, createElement } from 'react'
import './App.css'

function App() {
  const element = <h1 className='title'>Hello,world</h1>
  const element2 = createElement('h2',{className:'title'},'hello,react');
  return (
    <>
    <ul>
      {
        todos.map((todo,index )=>(
          <li key={index}>{todo.title}</li>
        ))
      }
    </ul>
      <ul>
        {
          todos.map(todo=>(
            createElement('li',{key:todo.id},todo.title)
          ))
        }
      </ul>


      {element}
      {element2}
    </>
  )
}

export default App

import {
   useState,
   useContext,
   useReducer
  } from 'react'
import './App.css'
// 负责提供上下文
import {
  TodoContext
}from './TodoContext'
import{useTodos}from './hooks/useTodos'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

function App() {
  const todoHook = useTodos();
  return (
    // App 状态管理
    <>
    <TodoContext.Provider value={todoHook}>
       <h1>TODO App</h1>
       <AddTodo />
       <TodoList />
    </TodoContext.Provider>  
    </>

  )
}

export default App

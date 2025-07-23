import { useState } from 'react'
import './App.css'
import Counter from "./components/Counter";
import { useCountStore } from './store/count';
import TodoList from './components/TodoList';
import RepoList from './components/ReposList';

function App() {
  const {count} = useCountStore();

  return (
    <>
    App中的{count}
      <Counter />
      <TodoList />
      <RepoList />
    </>
  )
}

export default App
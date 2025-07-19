import { 
  useState,
  useEffect
} from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    {
      id:1,
      title:"标题一"
    },
    {
      id:2,
      title:"标题二"
    },
    {
      id:3,
      title:"标题三"
    },
  ])

  useEffect(()=>{
    setTimeout(()=>{
    //   setTodos(
    //   pre => pre.map(todo => {
    //     if(todo.id === 1) {
    //       return {
    //         ...todo,
    //         title:'标题改'
    //       };
    //     }
    //     return todo;
    //   })
    // )
    // setTodos(pre => [
    //   ...pre,
    //   {
    //     id:4,
    //     title:"标题四"
    //   }
    // ])
    setTodos(pre => [
      {
        id:4,
        title:"标题四"
      },
      ...pre
    ])
    },5000)
  },[])
  return (
    <>
     <ul>
      {
        todos.map((todo,index )=>(
          <li key={index}>{todo.title}</li>
        ))
      }
     </ul>
    </>
  )
}

export default App

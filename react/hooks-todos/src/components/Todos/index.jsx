import {
    // 响应式状态hooks
     useState  //react  函数式编程 好用的以use开头的函数
} from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

const Todos = ()=>{
    // 数据流管理
    // 父组件持有管理数据  用props 传递数据   子组件通过props  自定义函数
    // 通知父组件  

    const [todos,setTodos] = useState([
        {
            id:1,
            title:'打豆豆',
            isComplete:false
        },
        {
            id:2,
            title:'算法比赛',
            isComplete:false
        },
    ])

    // 新增todo
     const addTodos = ()=>{
         // setTodo 
     }

    return(
    <>
        <div className='app'>
            Todos        
            {/* 自定义事件 */}
            <TodoForm
            onAddTodo={addTodos}
            />
            <TodoList todos={todos}/>
        </div>
    </>
    )
}
export default Todos;


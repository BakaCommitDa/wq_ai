import{
    useState,
    useEffect

} from 'react'


export const useTodos =()=>{
    const [todos, setTodos] = useState(JSON.parse(
        localStorage.getItem('todos')
    ));

    useEffect(()=>{
        // console.log('/////');
        // 接受字符串， 将JSON数组序列化
        localStorage.setItem('todos',JSON.stringify(todos))
        
    },[todos])

    const addTodo =  (text) => {
        // setTodo
        // 数据状态是对象的时候
        setTodos([
            ...todos,
            {
                id: Date.now(),
                text,
                isComplete: false
            }
        ])
    }
    const onToggle = (id)=>{
        console.log(id);

        
        //todos 数组找到id ,isCpmplete   !isComplete
        // 响应式？ 返回一个全新的todos map
        setTodos(todos.map(
            todo=>todo.id === id
            ? {...todo,isComplete:!todo.isComplete}
            : todo
        ))
    }
    const onDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }


    return {
        todos,
        setTodos,
        addTodo,
        onToggle,
        onDelete
    }
}


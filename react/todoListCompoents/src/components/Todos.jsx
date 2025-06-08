
// 列表的渲染
function Todos(props){
    // 父组件传过来的数据状态呢？ 传参
    console.log(props,'/////');
    const todos = props.todos;
    
    return(
        <ul>
        {
            todos.map(todos=>(
                <li key={todos.id}>{todos.text}</li>
            ))
        }
        </ul>

    )
}


export default Todos;
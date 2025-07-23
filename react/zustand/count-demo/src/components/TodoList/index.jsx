import { useTodoStore } from "../../store/todos";

const TodoList = () => {
    const {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo
    } = useTodoStore();
   return(
    <div>
        
        <ul>
            {todos.map((todo) => (
                <li key={todo.id}>
                    <span>{todo.text}</span>
                </li>
            ))}
        </ul>
    </div>
   )
}
export default TodoList;
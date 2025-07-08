const TodoItem = (props) => {
    const {
        // id,
        text,
        isComplete
    } = props.todo
    const {
        onToggle,
        onDelete
    } = props

    return (
        <div className="todo-item">
            <input type="checkbox" checked={isComplete} onChange={onToggle}/>
            <span className={isComplete?'completed':''}>{text}</span>
            <button onClick={onDelete}>Delete</button>
        </div>
    )
}
export default TodoItem
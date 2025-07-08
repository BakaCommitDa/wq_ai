import {
    useState // 子组件的私有状态
}from 'react'


const TodosForm = ({onAddTodo})=>{
    // 数据
    // props 参数数据
    // state 私有的数据
    // 单向数据流
    const [text,setText] = useState('')
    const handleSubmit = (e)=>{
        e.preventDefault();
        let result = text.trim();// dry don't repeat yourself
        if(!result)return;
        onAddTodo(result);
        setText('');// 用户体验   数据状态和界面状态一致要敏感
    }

    // JSX 一定得有唯一的最外层元素  树来编译解析JSX
    return(
        
        <>
            <h1 className="header">TodoList</h1>
            <form className='todo-input' onSubmit={handleSubmit}>
                <input 
                type="text"
                value={text}
                onChange={(e)=>{setText(e.target.value)}}
                placeholder='Todo text'
                required
                />
                <button type='submit'>Add</button>
            </form>
        </>
        
    )
}

export default TodosForm;
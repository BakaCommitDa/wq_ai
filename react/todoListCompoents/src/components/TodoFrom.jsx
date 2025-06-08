import{ useState } from 'react'
function TodoForm(props){
    const onAdd = props.onAdd;
    const [text,setText]=useState('')
    const handleSubmit = (e)=>{
        // 阻止表单的默认提交行为
        e.preventDefault();
        // console.log(text);
        onAdd(text);
        // 修改 todos? 打报告
        
    }
    const handleChange = (e)=>{
        setText(e.target.value);

    }
    return(
        <form action='http://www.baidu.com' onSubmit={handleSubmit}>
            <input type="text"
            placeholder="请输入代办事项"
            value={text}
            onChange={handleChange}
            
             />
             <button type="submit">添加</button>
        </form>
    )
}


export default TodoForm;
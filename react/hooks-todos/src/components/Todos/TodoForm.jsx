import {
    useState // 子组件的私有状态
}from 'react'


const TodosForm = (props)=>{
    // JSX 一定得有唯一的最外层元素  树来编译解析JSX
    return(
        
        <>
            <h1 className="header">TodoList</h1>
            <form action=""></form>
        </>
        
    )
}

export default TodosForm;
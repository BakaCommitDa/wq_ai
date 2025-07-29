import React from 'react'
interface Props{
    username:string;
    // typrscript 除了内置的类型外 
    // React 提供的类型
    // type = 'radio'   type = 'checkbox'
    // HTMLInputElement  event.target.value?
    // 重要的地方为空 不会错误  99.99%的错误
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}

const NameEditComponent:React.FC<Props> = (props) =>{

    return(

        <>
            <label>Update name</label>
            <input value={props.username} onChange={props.onChange}/>
        </>
    )

}


export default NameEditComponent;
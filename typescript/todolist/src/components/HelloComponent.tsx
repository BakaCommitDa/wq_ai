import React from 'react'
// 如何约束函数的返回值为ReactNode?  JSX
// FC == FunctionComponent

interface Props{
    name?:string
}
// typrscript 类型约束， 重要的地方一定要约束
// 泛型 泛型内部的类型
const HelloComponent:React.FC<Props> = (props) =>{
    // const {name} = props
    return (
        <h2>Hello user:{props.name}</h2>
    )
}


export default HelloComponent

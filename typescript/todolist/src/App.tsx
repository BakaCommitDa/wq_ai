import { useState } from 'react'
import './App.css'
import HelloComponent from './components/HelloComponent.tsx'

// react + typescript 
// javascript 可能会有一些问题,  主要因为弱类型
// jsx 后缀改为tsx
// 函数进行类型约束

// const HelloComponent =()=>{
//    // void 空  ReactNode
//    return 1;

// }



function App() {
  // 编译阶段
  // 多写了些类型声名文件
  // 多写了一些代码 类型声明 代码质量保驾护航
    let count:number = 10;
    const title:string = "hello ts"
    const isDone:boolean = true;
    const list:number[] = [1,2,3];
    // 元组类型
    const type:[string,number] = ['hello',100,];
    // 枚举类型
    // enum Status {
    //   Pending,
    //   Fullfilled,
    //   Rejected
    // }

    // const pStatus:Status = Status.Pending;
    // 对象的约束?
    // 接口
    interface User{
      name:string;
      age:number;
      isSingle?:boolean;
    }
    // 使用接口interface 来约定类型
    const user:User = {
      name:'安安',
      age:16,
      isSingle:true
    }
  return (
    <>
     {count}
     {title}
  
     {user.name}{user.age}
     {/* typescript */}
     <HelloComponent name='小安' />
    </>
  )
}

export default App

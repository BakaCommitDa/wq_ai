import { 
  useState,
  useReducer
} from 'react'
import './App.css'

// function App() {

//   return (
//     <>
//       <LoginContext.provider>
//         <ThemeContext.provider>
//           <TodosContext.provider>
//             <Layout>
//               <Header />
//               <Main />
//               <Footer />
//             </Layout>
//           </TodosContext.provider>
//         </ThemeContext.provider>
//       </LoginContext.provider>
//     </>
//   )
// }

// 可以管理好多
const initialValue = {
  count:0,
  isLogin:false,
  theme:'light'
}

// 管理  分部门
// reducer纯函数  返回可靠的状态
// 状态生产器

const reducer = (state,action) => {
  // increment,decrement
  // type:'increment'
  // case 状态的规定
  switch(action.type){    
    case 'increment':
      // 新的状态
        return {
          count : state.count + 1
        }
    case 'decrement':
        return {
          count : state.count - 1
        }
        case 'incrementByNum':
          return {
            count : state.count + parseInt(action.payload)
          }
    default:
        return state
  }
}

function App (){
  // 初始值 initialValue
  // 当前的状态值 旧状态  新状态
  // 界面由当前状态来驱动
  // 修改状态的方法 
  // 响应式
  // 管理 useState 有点 ，都有,高级点
  // dispatch 派发 函数
  // 参数固定

  const [count, setCount] = useState(0);
  // 适用于大型项目
  const [state,dispatch] = useReducer(reducer,initialValue);
  return(
    <>
    <p>Count:{state.count}</p>
    <button onClick={()=>dispatch({type:'increment'})}>+</button>
    <button onClick={()=>dispatch({type:'decrement'})}>-</button>
    <input type="text" value={count} onChange={(e)=>setCount(e.target.value)} />
    <button onClick={()=>dispatch({type:'incrementByNum',payload:count})}>incrementByNum</button>
    </>
  )
}

export default App

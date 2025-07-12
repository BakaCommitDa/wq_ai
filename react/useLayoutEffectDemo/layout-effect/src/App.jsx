import {
   useState,
   useEffect,
   useLayoutEffect,
   useRef
 } from 'react'

import './App.css'

// function App() {
//   // 响应式对象
//   const boxRef = useRef();
//   console.log(boxRef.current,boxRef);
  
//   useEffect(()=>{
//     console.log('useEffecr height',boxRef.current.offsetHeight);
    
//   },[])

//     useLayoutEffect(()=>{
//     console.log('useLayoutEffecr height',boxRef.current.offsetHeight);
    
//   },[])
//   return (
//     <>
//     <div ref={boxRef} style={{height:100}}> </div>
//     </>
//   )
// }


// function App(){
//   const [content,seContent] = useState('진심으로 사랑할 기회가 있었지만 저는 그것을 소중히 여기지 않았습니다. 잃고 나서야 후회했죠. 세상에서 가장 고통스러운 일은 바로 이겁니다. 만약 하늘이 다시 기회를 준다면, 저는 그 소녀에게 세 마디를 할 것입니다. "사랑합니다." 그리고 이 사랑에 기한을 정해야 한다면, 저는 만 년을 원합니다');
//   const ref = useRef();
//   // useEffect(()=>{
//   //   seContent('曾经有一份真诚的爱情放在我面前，我没有珍惜，等我失去的时候我才后悔莫及，人世间最痛苦的事莫过于此。如果上天能够给我一个再来一次的机会，我会对那个女孩子说三个字：‘我爱你’。如果非要给这份爱加上一个期限，我希望是一万年。')
//   // ref.current.style.height = '200px';
//   // },[])
//   useLayoutEffect(()=>{
//     // 阻塞渲染  有点同步的感觉
//     seContent('曾经有一份真诚的爱情放在我面前，我没有珍惜，等我失去的时候我才后悔莫及，人世间最痛苦的事莫过于此。如果上天能够给我一个再来一次的机会，我会对那个女孩子说三个字：‘我爱你’。如果非要给这份爱加上一个期限，我希望是一万年。')
//   ref.current.style.height = '200px';
//   },[])


//   return(
//     <>
//     <div ref={ref} style={{height:'100px',backgroundColor:'lightblue'}}>{content}</div>
//     </>
//   )
// }

//


// 弹窗
function Modal(){
   const ref = useRef();
   useLayoutEffect(()=>{
    const height = ref.current.offsetHeight;
    ref.current.style.marginTop = `${(window.innerHeight - height) / 2 }px`;
   },[])
    return <div  ref={ref} style={{margin:'auto',backgroundColor:'purple',position:'absolute',height:'200px',width:'200px'}}>我是弹窗</div>
  }



function App(){
   return(
    <>
    <Modal />
    </>
   )
}

export default App

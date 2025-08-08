import { useState,useEffect } from 'react'
import './App.css'

function App() {
  useEffect(()=>{
    // (async()=>{
    //   // 前后端联调
    //   const res = await fetch('http://localhost:8080/api/hello');
    //   const data = await res.json();
    //   console.log(data);
      
    // })()
    
  },[])

  return (
    <>
     <img src="https://ts1.tc.mm.bing.net/th/id/OIP-C.NMZsJHCEgOAGq3_ae5sNOwAAAA?w=200&h=211&c=8&rs=1&qlt=70&o=7&cb=thws4&dpr=1.6&pid=3.1&rm=3" alt="" />
    </>
  )
}

export default App

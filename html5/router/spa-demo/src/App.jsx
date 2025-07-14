import { useState } from 'react'
import './App.css'
import { 
  BrowserRouter as Router,// 前端路由二选一
  Routes,
  Route,
  Link // SPA Link组件 代替a
} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

function App() {


  return (
    <>
     <Router>
          <nav>
              <ul>
                  <li><Link to="./">Page 1</Link></li>
                  <li><Link to="./about">Page 2</Link></li>
              </ul>
          </nav>
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route  path="/about" element={<About />} />
       </Routes>
     </Router>
    </>
  )
}

export default App

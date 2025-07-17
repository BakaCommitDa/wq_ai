import { useState } from 'react'
import './App.css'
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import Home from './pages/Home';
import Abouts from './pages/abouts';

function App() {
  
  return (
    <>
     <Router>
     <nav>
      <ul>
        <li>
          <Link to="/" >首页</Link>
        </li>
        <li>
          <Link to="/about" >关于</Link>
        </li>
      </ul>
     </nav>
     <main>
      <div className="container">
        <Routes>
          <Route path="/" element={Home}/>
          <Route path="/about" element={<Abouts />}/>
        </Routes>
      </div>
     </main>
     </Router>
    </>
  )
}

export default App
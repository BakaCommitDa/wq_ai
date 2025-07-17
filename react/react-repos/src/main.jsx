import{
    BrowserRouter as Router
}from 'react-router-dom'
import{
    GlobalProvider
}from './context/GlobalContext.jsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './index.css'
// 页面级别组件由路由驱动

createRoot(document.getElementById('root')).render(
    <GlobalProvider>
      <Router>
        <App />
      </Router>
    </GlobalProvider>
)

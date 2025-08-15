import { useState } from 'react'
import './App.css'
import Page from './components/Page'
import { ThemeContext } from './ThemeContext'

function App() {
  const [theme,setTheme] = useState('light')
  console.log(ThemeContext,'///');
  
  return (
       <ThemeContext.Provider value={theme}>
       <Page/>

       <button onClick={()=>setTheme('dark')}>切换主题</button>
      {/* <Uncle/> */}
      {/* <Parent>
        <Child>
          <GrandClid>
            <GreatGrandChild></GreatGrandChild>
          </GrandClid>
        </Child>
      </Parent> */}
      </ThemeContext.Provider>

  )
}

export default App

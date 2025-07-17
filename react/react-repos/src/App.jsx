import { 
  useState,
  useEffect,
  Suspense,
  lazy
 } from 'react'
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Loading from './components/Loading'

const RepoList = lazy(()=>import('./pages/ReposList'))


function App() {



  return (
    <>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/users/:id/repos' element={<RepoList />} />
        <Route path='*' element={<Navigate to='/users/BakaCommitDa/repos' />} />
      </Routes>
    </Suspense>
     
    </>
  )
}

export default App

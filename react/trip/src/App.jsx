import './App.css'
import { 
  lazy,
  Suspense
} from 'react';
import {
  Route,
  Routes,
  Navigate
}from 'react-router-dom'
import MainLayout from '@/components/MainLayout'
import Blankyout from '@/components/Blankyout'

const Home = lazy(() => import('@/pages/Home'))
const Search = lazy(() => import('@/pages/Search'))
const Discount = lazy(() => import('@/pages/Discount'))
const Collection = lazy(() => import('@/pages/Collection'))
const Trip = lazy(() => import('@/pages/Trip'))
const Account = lazy(() => import('@/pages/Account'))

function App() {


  return (
    <>
    <Suspense fallback={<div>loading</div>}>
      <Routes>
        {/* 带有tabber的layout */}
        <Route element={<MainLayout/>}>
          <Route path='/' element={<Navigate to='/Home'/>} />
          <Route path='/Home' element={<Home/>} />
          <Route path='/Discount' element={<Discount/>} />
          <Route path='/Collection' element={<Collection/>} />
          <Route path='/Trip' element={<Trip/>} />
          <Route path='/Account' element={<Account/>} />
        </Route>
        {/* 空的Layout */}
        <Route element={<Blankyout/>}>
          <Route path='/search' element={<Search/>} />
        </Route>
      </Routes>
    </Suspense>
    </>
  )
}

export default App

import React from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import Login from './components/Login'
import Home from './container/Home'
import GoogleAuth from './components/GoogleAuth'

const App = () => {
  return (
    <div>
      <Routes>
         <Route path='/*' element={<Home/>}/>
        <Route path='/auth' element={<GoogleAuth/>}/>
          <Route path='/login' element={<Login/>}/>

      </Routes>
    </div>
  )
}
export default App

// <Route path='/login' element={<Login/>}/>

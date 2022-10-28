import React, {useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Login from './components/Login'
import Home from './container/Home'
import GoogleAuth from './components/GoogleAuth'

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ?
    JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    if (!User) navigate('/');
  }, []);

  return (
    <div>
      <Routes>
        <Route path='login' element={<GoogleAuth/>}/>
         <Route path='/*' element={<Home/>}/>
      </Routes>
    </div>
  )
}
export default App

// <Route path='/login' element={<Login/>}/>

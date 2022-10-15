import React, { useState, useRef, useEffect } from 'react'
import { HiMenu} from 'react-icons/hi'
import { AiFillCloseCircle} from 'react-icons/ai'
import { Link,Route,Routes } from 'react-router-dom'
import { Login } from '../components'
import { client } from '../client'
import logo from '../assets/logo.png'
import Pin from './Pin'
import SideBar from '../components/SideBar'

const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [user, setUser] = useState('')
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();  
  useEffect(() => {
    
  }, [])
  
  return (
      <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
        <div className='hidden md:flex h-screen flex-initial'>
          <SideBar/>
        </div>
        <div className='flex md:hidden flex-row'>
          <HiMenu fontSize={40} className='curser-pointer' onClick={() => {
            setToggleSideBar(false)
          }}/>
          <Link to={'/'}>
            <img src={logo} alt='logo' className='w-28'/>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={logo} alt='logo' className='w-28'/>
          </Link>
          
        </div>
      </div>
    )
}
export default Home;
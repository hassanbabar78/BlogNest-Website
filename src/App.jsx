import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authServices from './appWrite/Auth'
import {login as AuthLogin, logout as AuthLogout} from "./store/authSlice"
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authServices.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(AuthLogin({userData}))
      } else {
        dispatch(AuthLogout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return (
    <div className='min-h-screen flex flex-wrap content-between bg-neutral-500'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) 
}

export default App



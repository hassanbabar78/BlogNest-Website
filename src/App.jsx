import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authServices from './appWrite/Auth'
import {login as AuthLogin, logout as AuthLogout} from "./store/authSlice"

import Layout from './components/Layout'

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
    <div className='w-screen h-auto bg-[#121028]'> 
       <Layout/>
    </div>
  ) 
}

export default App



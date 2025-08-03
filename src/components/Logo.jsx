import React from 'react'
import logo from '../images/logos2.png'

function Logo({
    width = '50px',
}) {
  return (
    <div>
         <img src={logo} alt="App Logo" style={{ width, borderRadius: '50%'  }} />
    </div>
  )
}

export default Logo

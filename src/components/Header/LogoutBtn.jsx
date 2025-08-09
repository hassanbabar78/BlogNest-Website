import React from "react";
import {useDispatch} from 'react-redux'
import authServices from "../../appWrite/Auth";
import {logout} from '../../store/authSlice'
import { useNavigate } from "react-router-dom";


function Logoutbtn(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = ()=>{
        const response = authServices.logout();
        setTimeout(() => {
            navigate("/");
        }, 0); 
        response.then(()=>{
          dispatch(logout());
        })
    }
    return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full'
    onClick={handleLogout}
    >Logout</button>
  )
}

export default Logoutbtn;
import React from 'react'
import './LoginPage.css'
import Auth from '../Auth/Auth'
import Register from '../Register/Register'

const LoginPage = (props) => {
  return (
    <div className='login-page-container'>
        <div className='login-page-left'>
            {props.isLogin ? <Auth/>: <Register/>}
        </div>
        <div className='login-page-right'>
        </div>
    </div>
  )
}

export default LoginPage
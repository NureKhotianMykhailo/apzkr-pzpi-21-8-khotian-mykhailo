import React from 'react'
import './LoginElement.css'

const LoginElement = (props) => {
  return (
    <div className='login-element-container'>
        <div className='login-element-line'>
            <img className =  'login-element-image' src = {props.src}></img>
            <input className = 'login-element-input' placeholder= {props.name + '...'}></input>
        </div>
    </div>
  )
}

export default LoginElement
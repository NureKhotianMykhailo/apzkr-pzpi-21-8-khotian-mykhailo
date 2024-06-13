import React from 'react'
import './AuthButton.css'
const AuthButton = (props) => {
  return (
    <button className='auth-button-container' onClick = {props.function}>
        {props.name}
    </button>
  )
}

export default AuthButton
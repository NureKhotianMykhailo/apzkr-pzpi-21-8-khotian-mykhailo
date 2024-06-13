import React from 'react'
import './Find.css'

const Find = (props) => {

  const isEnglish = true
  return (
    <div className='find-line'>
        <input className='find-line-input' placeholder = {props.placeholder}></input>
        <button className = "find-button" onClick = {()=>{
          const value = document.getElementsByClassName('find-line-input')[0].value
          window.location.href = `/user?user=${value}`
        }}>{props.button}</button>
    </div>

  )
}

export default Find
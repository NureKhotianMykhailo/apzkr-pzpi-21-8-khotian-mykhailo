import React from 'react'
import './Left.css'
import Menu from '../Left-Side Menu/Menu'
import Stared from '../Stared-Accounts/Stared'
const Left = (props) => {
  return (
    <div class = "left-column">
        <Menu current = {props.current}/>
        <Stared/>
    </div>
  )
}

export default Left
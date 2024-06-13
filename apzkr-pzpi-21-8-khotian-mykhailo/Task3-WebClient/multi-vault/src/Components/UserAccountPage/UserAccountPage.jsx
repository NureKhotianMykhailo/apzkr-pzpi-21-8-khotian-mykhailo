import React from 'react'
import './UserAccountPage.css'
import Portfolio from '../Portfolio/Portfolio'
import Left from '../Left-Column/Left'



const UserAccountPage = (props) => {
  return (
    <div className='app'>
         <div className='menu-container'>
            <Left current = {props.current} />
        </div>
        <div className='main-container'>
            <Portfolio isMain = {props.isMain}/>
        </div>
    </div>
  )
}

export default UserAccountPage
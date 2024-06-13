import React from 'react'
import Left from '../Left-Column/Left'
import Acounts from '../Acounts/Acounts'


const AccountPage = (props) => {
  return (
    <div className="App">
        <div className='menu-container'>
            <Left current = {props.current}/>
        </div>
        <div className='main-container'>
            <Acounts />
        </div>
    </div>
  )
}

export default AccountPage
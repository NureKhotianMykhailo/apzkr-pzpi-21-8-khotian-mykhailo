import React from 'react'
import Left from '../Left-Column/Left'
import Settings from '../Settings/Settings'

const SettingsPage = (props) => {
  return (
    <div className="App">
        <div className='menu-container'>
            <Left current = {props.current}/>
        </div>
        <div className='main-container'>
            <Settings />
        </div>
    </div>
  )
}

export default SettingsPage
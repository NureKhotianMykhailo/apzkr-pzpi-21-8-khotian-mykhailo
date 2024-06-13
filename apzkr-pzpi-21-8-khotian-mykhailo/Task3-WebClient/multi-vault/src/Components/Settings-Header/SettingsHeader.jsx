import React, { useState } from 'react';
import './SettingsHeader.css'
import SettingsHeaderElement from '../Settings-Header-Element/SettingsHeaderElement'



const SettingsHeader = (props) => {
  const isEnglish = props.isEnglish
  const [ActiveHeader, setActiveHeader] = props.activeHeader
  return (
    <div className='settings-header-container'>
        <SettingsHeaderElement name = {isEnglish ? 'General': 'Загальне'} isActive = {ActiveHeader == 0 ? true : false}  onClick = {() => setActiveHeader(0)} />
        <SettingsHeaderElement name = {isEnglish ? 'Accounts': 'Акаунти'} isActive = {ActiveHeader == 1 ? true : false}  onClick = {() => setActiveHeader(1)} />
        <SettingsHeaderElement name = {isEnglish ? 'About': 'Про нас'} isActive = {ActiveHeader == 2 ? true : false}  onClick = {() => setActiveHeader(2)} />
        <SettingsHeaderElement name = {isEnglish ? 'Help': 'Допомога'} isActive = {ActiveHeader == 3 ? true : false}  onClick = {() => setActiveHeader(3)} />
    </div>
  )
}

export default SettingsHeader
import React from 'react'
import './SettingsHeaderElement.css'

const SettingsHeaderElement = (props) => {
  return (
    <a className={props.isActive ? 'settings-header-element settings-header-element-active' : 'settings-header-element'} onClick={props.onClick}>
        {props.name}
    </a>
  )
}

export default SettingsHeaderElement
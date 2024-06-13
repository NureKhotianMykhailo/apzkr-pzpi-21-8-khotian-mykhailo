import React, { useState } from 'react';
import './SettingsElement.css'
import axios from 'axios'

const SettingsElement = (props) => {

const options = props.options

    const [isA, setIsA] = useState(props.isActive == undefined ? false : props.isActive)

    const buttonClick = () => {

       setIsA(!isA)
       axios.put("/api/user", {
        settings: {            
            hideEmptyTokens: isA,
        },
    })

  };

  return (
    <div className='settings-element-container'>
        {
        props.type != "Text" ? 
            <div className='settings-element-text'>
                <p className='settings-element-name'>
                    {props.name}
                </p>
                <p className='settings-element-description'>
                    {props.description}
                </p>
            </div>
            :
            <div className='settings-element-text'>
                <p className='settings-element-name'>
                    {props.name}
                </p>
                <p className='settings-element-description'>
                    {props.description}
                </p>
                <p className='settings-element-description'>
                    {props.description2}
                </p>
            </div>
        }
        {props.type == "List" ? <div className='settings-element-list'>
        <select onChange = {(e)=>{
            e.target.value == 'region-ua' || e.target.value == 'region-us' ? 
            axios.put("/api/user", {
                settings: {                    
                    isEngRegion: e.target.value == 'region-us',                    
                },
            }).then((responce) => {
            })
            :           
            axios.put("/api/user", {
                settings: {                    
                    isEngLanguage: e.target.value == 'language-us',
                },
            }).then((responce) => {
            })
        
        
        }}>
            {options.map((option, index) => (
                <option key={index} value={option.value} selected={index === props.active} >{option.label} </option>
            ))}
        </select>
        </div>
         : 
         props.type == "Bool" ?
         <div className = {'settings-element-tab'} onClick={buttonClick}>
            <div className = {isA ?  'settings-element-tab-full settings-element-tab-full-active':'settings-element-tab-full'}>
            </div>
            <div className = {isA ? 'settings-element-tab-non-full settings-element-tab-non-full-active' 
            :
             'settings-element-tab-non-full'}>
            </div>
        </div>
        :
        props.type == "Button" ?
        <div className = {'settings-element-button'}>
                {props.isLogOut ?
                <button className='settings-button' onClick={()=>{
                    axios.get("/auth/logout").then((responce) => window.location.href = '/login')
                }}>                   
                    {props.buttonName}                   
                </button>
                :
                <button className='settings-button' onClick={props.onClick}>
                    {props.buttonName}
                </button>
                }
        </div>
        :
        <></>
        } 

    </div>
  )
}

export default SettingsElement
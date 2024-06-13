import React, {useState, useEffect} from 'react'
import Element from '../Menu-Element/Element'
import './Menu.css'
import axios from 'axios'

const Menu = (props) => {

  const fetchUserSettings = async () => {
    try {    
        const response = await axios.get('api/user')
        return response.data.settings    
    } catch (error) {    
        console.error(error)    
    }    
}
const [isEnglish, setIsEnglish] = useState(null)
useEffect(() => {
    const fetchWallet = async () => {
        try {
            const settingsData = await fetchUserSettings()
            setIsEnglish(settingsData.isEngLanguage)
        } catch (error) {
            console.error(error);
        }
    };
    fetchWallet();

}, []);

  return (



    
    <div className = "menu">
        <div className='menu-header'>
            <h2 className='menu-h2'>{isEnglish? "MENU": "МЕНЮ"}</h2>
        </div>
        
        <Element 
          isHidden = {false} 
          isLink = {true} 
          iconSrc="portfolio.png" 
          name={isEnglish? "Portfolio": "Портфоліо"} 
          link = "Portfolio"
          isActive = {props.current == "Portfolio" ? true : false}/>

        <Element 
          isHidden = {false} 
          isLink = {true} 
          iconSrc="wallet.png" 
          link = "Accounts"
          name={isEnglish?  "Accounts" : "Акаунти"}
          isActive={props.current == "Accounts" ? true : false} />

        <Element 
          isHidden = {true} 
          isLink = {false} 
          iconSrc="upload.png" 
          name={isEnglish?  "Send"  : "Відправити"}
          isActive ={props.current == "Send" ? true : false} />

        <Element
          isHidden = {true} 
          isLink = {false} 
          iconSrc="download.png"
          name={isEnglish?  "Recieve"  : "Отримати"}
          isActive = {props.current == "Recieve" ? true : false} />

        <Element 
          isHidden = {false} 
          isLink = {true} 
          link = "Settings"
          iconSrc="settings.png" 
          name={isEnglish? "Settings" : "Налаштування"}
          isActive = {props.current == "Settings" ? true : false} />
        
    </div>
  )
}

export default Menu
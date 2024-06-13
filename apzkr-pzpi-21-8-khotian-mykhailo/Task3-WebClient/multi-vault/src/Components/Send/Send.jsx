import React, {useState, useEffect} from 'react'
import './Send.css'
import axios from 'axios'
import Recieve from '../Recieve/Recieve'

const Send = (props) => {
    const fetchUserWallet = async () => {
        try {    
            const response = await axios.get('api/user')

            return response.data.wallet    
        } catch (error) {    
            console.error(error)    
        }    
    }


    const fetchUserSettings = async () => {
        try {    
            const response = await axios.get('api/user')
            return response.data.settings    
        } catch (error) {    
            console.error(error)    
        }    
    }
    
    const fetchData = async (data) => {
        try {
            const response = await axios.post('api/sendtrx', data)
        } catch (error) {
           // alert(isEnglish ? "Username or password are incorrect" : "Неправильне ім`я або пароль")
        }

    }
    const [wallet, setWallet] = useState(null)
    const [isEnglish, setIsEnglish] = useState(null)
    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const walletData = await fetchUserWallet()
                setWallet(walletData)
                const settingsData = await fetchUserSettings()
                setIsEnglish(settingsData.isEngLanguage)
            } catch (error) {
                console.error(error);
            }
        };
        fetchWallet();

    }, []);
    const [IsHidden, setIsHidden] = props.isActive
    function isFloat(str) {
        return /^[+-]?\d+(\.\d+)?$/.test(str);
    }
    function checkAmount(x){
        if (isFloat(x)) return parseFloat(x) 
        alert(isEnglish ? "Wrong amount format" : "Неправильний формат  суми")
        return -1
    }

    async function newFunction() {
        const adress = document.getElementById('send-input-adress').value
        const amount = document.getElementById('send-input-amount').value

        if (checkAmount(amount) == -1) return
        const amountToSend = checkAmount(amount)

        const data = { "reciever": adress, "amount": amountToSend }
        await fetchData(data)
    }

  return (
    <div className = {IsHidden ? 'send-container hidden': 'send-container' }>

        <div className = 'send-header'>
            Send
        </div>

        <div className = 'send-adress-input' id = "send-adress">
            <input className='send-input' id = "send-input-adress" placeholder = 'Adress...'></input>
        </div>

        <div className = 'send-amount-input'>
            <div className='amount-container'>
                {isEnglish? "Amount":"Сума"}

            </div>
            <div className = 'send-adress-input' id = "send-amount">
                <input className='send-input' id = "send-input-amount" placeholder = 'Amount...'></input>
                <p className='send-input-eth'>ETH</p>     
            </div>
        </div>

        <div className= 'send-buttons'>
            <div className='send-button' id = "cancel-button" onClick={()=>{setIsHidden(true)}}>
                {isEnglish? "Cancel":"Відміна"}
            </div>
            <div className='send-button' id = "confirm-button" onClick={
                newFunction
            }>
                 {isEnglish? "Confirm":"Підтвердити"}
            </div>
        </div>
    </div>
  )
}

export default Send



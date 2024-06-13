import React, {useState} from 'react'
import './AlocationTable.css'
import AlocationElement from '../AlocationElement/AlocationElement'

const AlocationTable = (props) => {

    const isEnglish = props.isEnglish
    const [ethCount,setEthCount] = useState(props.data[0]? props.data[0].eth : 0)

    const isHide = false
  return (
    <div className='alocation-table-container'>
        <div className='alocation-table-header'>{isEnglish ? "Asset allocation": "Розподіл токенів"}</div>

        <div className='alocation-table'>
            <div className='alocation-table-row alocaion-table-first'>
                <div className='allocation-table-div-20'>{isEnglish ? "Asset": "Токен"}</div>
                <div className='allocation-table-div-20'>{isEnglish ? "Price": "Ціна"}</div>
                <div className='allocation-table-div-40'>{isEnglish ? "Allocation": "Розподіл"}</div>
                <div className='allocation-table-div-10'>{isEnglish ? "Amount": "Кількість"}</div>
                <div className='allocation-table-div-10'>{isEnglish ? "Value": "Вартість"}</div>

            </div>
            <div className='alocation-table-row'>
                <AlocationElement iconSrc="ETH.png" name="Ethrerium" 
                price = {props.data.ethValue? props.data.ethValue : 3000.0} 
                amount = {props.data.eth? props.data.eth : 0} 
                totalAmount = {props.data.eth? props.data.ethValue * props.data.eth + 1.001*props.data.usdc + 0.999*props.data.usdt : 1} 
                value = {props.data.ethValue? props.data.ethValue*props.data.eth : 0} 
                color = {
                    (props.data.eth?( props.data.ethValue*props.data.eth) / (props.data.ethValue * props.data.eth + 1.001*props.data.usdc + 0.999*props.data.usdt) : 1) > 0.8
                    ?  'green' :
                    (props.data.eth?( props.data.ethValue*props.data.eth) / (props.data.ethValue * props.data.eth + 1.001*props.data.usdc + 0.999*props.data.usdt) : 1) > 0.2?
                    "yellow" : 
                    "red"
                } />
            </div>
            <div className='alocation-table-row'>
                <AlocationElement iconSrc="USDC.png" name="USDC" 
                price = {1.0012} 
                amount = {props.data.usdc? props.data.usdc : 0} 
                totalAmount = {props.data.eth? props.data.ethValue * props.data.eth + 1.001*props.data.usdc + 0.999*props.data.usdt : 1} 
                value = {props.data.usdc? 1.0012*props.data.usdc : 0} 
                color = {(props.data.eth?( 1.0012*props.data.usdc) / (props.data.ethValue * props.data.eth + 1.001*props.data.usdc + 0.999*props.data.usdt) : 1) > 0.8
                ?  'green' :
                (props.data.eth?( 1.0012*props.data.usdc) / (props.data.ethValue * props.data.eth + 1.001*props.data.usdc + 0.999*props.data.usdt) : 1) > 0.2?
                "yellow" : 
                "red"
                }/>
            </div>
            <div className='alocation-table-row'>
                <AlocationElement iconSrc="USDT.png" name="USDT" 
                price = {0.9998} 
                amount = {props.data.usdt? props.data.usdt : 0} 
                totalAmount = {props.data.eth? props.data.ethValue * props.data.eth + 1.001*props.data.usdc + 0.999*props.data.usdt : 1} 
                value = {props.data.usdt? 0.9998*props.data.usdt : 0} 
                color = {(props.data.eth?(  0.9998*props.data.usdt) / (props.data.ethValue * props.data.eth + 1.001*props.data.usdc + 0.999*props.data.usdt) : 1) > 0.8
                ?  'green' :
                (props.data.eth?( 0.9998*props.data.usdt) / (props.data.ethValue * props.data.eth + 1.001*props.data.usdc + 0.999*props.data.usdt) : 1) > 0.2?
                "yellow" : 
                "red"
                }/>
            </div>
            {
               !isHide ?  <div className='alocation-table-row'>
               <AlocationElement iconSrc="IGNITE.png" name="IGNITE" 
               price = {0} 
               amount = {props.data.ignite? props.data.ignite : 0} 
               totalAmount = {1} 
               value = {0} 
               color = {"red"}/>
           </div> : <></>
            }
           
        </div>
    </div>
  )
}

export default AlocationTable
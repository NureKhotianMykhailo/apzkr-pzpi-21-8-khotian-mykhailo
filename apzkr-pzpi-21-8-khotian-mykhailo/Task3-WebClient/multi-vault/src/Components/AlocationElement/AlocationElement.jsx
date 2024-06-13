import React from 'react'
import './AlocationElement.css'


function getAlocation(value, totalAmount){
    return totalAmount? (value/totalAmount)*100 : 0
}
function getAlocationWidth(value, totalAmount){
    return totalAmount? (value/totalAmount)*15 + "vw" : 0
}

const AlocationElement = (props) => {
  return (
    <div className='element-line'>
        <div className='asset-container'>
            <img class = "element-icon" src={"Static/" + props.iconSrc}></img>
            <h3 class = "element-name">{props.name}</h3>
        </div>
        <div className='element-price'>
            <h3 className='element-price-h3'>{"USD "+ parseFloat(props.price).toFixed(4)}</h3>
        </div>
        <div className='element-alocation'>
            <h3 className='element-alocation-h3'>{getAlocation(props.value, props.totalAmount).toFixed(2) + "%"}</h3>
            <div className='element-alocation-line'>
                <div className='element-allocaion-line-full'></div>
                <div className='element-allocaion-line-non-full' style = {{width: `${getAlocationWidth(props.value, props.totalAmount)}`, backgroundColor: `${props.color}`}}></div>
            </div>
        </div>
        <div className='element-amount'>
            <h3 className='element-amount-h3'>{parseFloat(props.amount).toFixed(6)}</h3>
        </div>
        <div className='element-value'>
            <h3 className='element-value-h3'>{"USD " + props.value.toFixed(2)}</h3>
        </div>
    </div>
  )
}

export default AlocationElement
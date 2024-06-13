import React from 'react'
import './StaredElement.css'
const StaredElement = (props) => {
  return (
    <div class="starred-element-container" onClick = {()=>{
      window.location.href = `/user?user=${props.user}`
    }}>
      <img class="starred-element-image" src={props.imageSrc} alt="Image" />
      <div class="starred-element-content">
        <h3 class="starred-element-title">{props.title}</h3>
        <h4 class="starred-element-description">{props.description}</h4>
      </div>
    </div>
  )
}

export default StaredElement
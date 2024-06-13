import React from 'react'
import Left from '../Left-Column/Left'
import Portfolio from '../Portfolio/Portfolio'

const PortfolioPage = (props) => {
  return (
    <div className="App">
        <div className='menu-container'>
            <Left current = {props.current} />
        </div>
        <div className='main-container'>
            <Portfolio isMain = {props.isMain}/>
        </div>
    </div>
  )
}

export default PortfolioPage
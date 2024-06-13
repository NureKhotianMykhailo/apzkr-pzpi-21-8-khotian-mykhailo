import React from 'react'
import './404.css'

const Page404 = () => {

  const isEnglish = true
  return (
    <div className='page-container'>
        <div className='div-container'>
            <h1>404</h1>
            <h2>{isEnglish ? "Page not found" : "Сторінку не знайдено"}</h2>
           
              <button className='to-main'> 
                <a href = "/login">
                  {isEnglish ? "Return to main page" : "До головної"}
                </a>
              </button>
            
        </div>
    </div>
  )
}

export default Page404
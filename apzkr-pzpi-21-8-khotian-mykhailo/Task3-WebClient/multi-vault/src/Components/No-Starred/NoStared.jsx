import React from 'react'
import './NoStared.css'

const NoStared = () => {

  const isEnglish = true

  return (
    <div className='no-stared'>
        <h3>{isEnglish ? 
        "Accounts that you star on the <b>Accounts</b> page will now appear here!"
        :
        "Акаунти, котрі ви зберігли на сторінці <b>Акаунти</b> будуть показані тут!"}</h3>
    </div>
    
  )
}

export default NoStared
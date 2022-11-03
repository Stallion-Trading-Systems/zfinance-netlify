import React from 'react'
import "./titlebutton.css"

const TitleButton = (props) => {
  return (
    <div>
        <input type="text" className='butto mar-left' placeholder={props.name}/>
    </div>
  )
}

export default TitleButton
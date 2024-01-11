import React from 'react'
import './Navbar.css'

const navbar = () => {
  return (
    <div id='navbar'>
        <div id='logo'></div>

        <div id='cont-header'>
            <div id='box-icones'>
                <div id='icon'></div>
                <div id='word'></div>
                <div id='hug'></div>
            </div>
        </div>

        <div id='user-info'>
            <div id='user-image'></div>
            <div id='user-name'></div>
        </div>
    </div>
  )
}

export default navbar
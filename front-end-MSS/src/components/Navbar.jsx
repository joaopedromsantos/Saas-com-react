import React from 'react'
import './Navbar.css'

import Foto from "../media/logo.png"
import Foto_User from "../media/exemplo-foto.png"

import { RxDashboard } from "react-icons/rx";
import { BsBoxSeam } from "react-icons/bs";
import { RiBrush2Line } from "react-icons/ri";
import { TbCash } from "react-icons/tb";



const navbar = () => {
  return (
    <div id='navbar'>
        <div id='logo'>
          <img src={Foto} id='logo-imagem'></img>
        </div>

        <div id='cont-header'>
            <div className='box-header'>
                <div className='icon'>
                  <RxDashboard />
                </div>
                <div className='word'>
                  <p>Dashboard</p>
                </div>
                <div className='hub'>
                </div>
            </div>
            <div className='box-header'>
                <div className='icon'>
                  <BsBoxSeam  />
                </div>
                <div className='word'>
                  <p>Estoque</p>
                </div>
                <div className='hub'></div>
            </div>
            <div className='box-header'>
                <div className='icon'>
                  <RiBrush2Line    />
                </div>
                <div className='word'>
                  <p>Marcações</p>
                </div>
                <div className='hub'></div>
            </div>
            <div className='box-header'>
                <div className='icon'>
                  <TbCash  />
                </div>
                <div className='word'>
                  <p>Cobranças</p>
                </div>
                <div className='hub'></div>
            </div>
        </div>

        <div id='user-info'>
            <div id='user-image'>
              <img src={Foto_User} id='user-foto'></img>
            </div>
            <div id='user-name'>
              <p>João Pedro</p>
            </div>
        </div>
    </div>
  )
}

export default navbar
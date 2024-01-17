import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";

import './styles/Navbar.css'

import Foto from "../media/logo.png"
import Foto_User from "../media/exemplo-foto.png"

import { RxDashboard } from "react-icons/rx";
import { BsBoxSeam } from "react-icons/bs";
import { RiBrush2Line } from "react-icons/ri";
import { TbCash } from "react-icons/tb";



const navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const activeStyle = {
    transform: 'scale(1.1)',
    background: 'radial-gradient(circle, rgba(235, 235, 235, 0.849) 0%, transparent 100%)',
    borderRadius: '10px'
  };

  return (
    <div id='navbar'>
        <div id='logo'>
          <img src={Foto} id='logo-imagem'></img>
        </div>

        <div id='cont-header'>
            <div className='box-header' onClick={() => navigate('/')} style={isActive('/') ? activeStyle : {}}>
                <div className='icon' style={isActive('/') ? { color: '#ceb375' } : {}}>
                  <RxDashboard />
                </div>
                <div className='word'>
                  <p style={isActive('/') ? { color: '#ceb375' } : {}}>Dashboard</p>
                </div>
                <div className='hub' style={{ visibility: isActive('/') ? 'visible' : 'hidden' }}>
                </div>
            </div>
            <div className='box-header' onClick={() => navigate('/estoque')} style={isActive('/estoque') ? activeStyle : {}}>
                <div className='icon' style={isActive('/estoque') ? { color: '#ceb375' } : {}}>
                  <BsBoxSeam  />
                </div>
                <div className='word'>
                  <p style={isActive('/estoque') ? { color: '#ceb375' } : {}}>Estoque</p>
                </div>
                <div className='hub' style={{ visibility: isActive('/estoque') ? 'visible' : 'hidden' }}></div>
            </div>
            <div className='box-header' onClick={() => navigate('/marcacao')} style={isActive('/marcacao') ? activeStyle : {}}>
                <div className='icon' style={isActive('/marcacao') ? { color: '#ceb375' } : {}}>
                  <RiBrush2Line    />
                </div>
                <div className='word'>
                  <p style={isActive('/marcacao') ? { color: '#ceb375' } : {}}>Marcações</p>
                </div>
                <div className='hub' style={{ visibility: isActive('/marcacao') ? 'visible' : 'hidden' }}></div>
            </div>
            <div className='box-header' onClick={() => navigate('/cobrar')} style={isActive('/cobrar') ? activeStyle : {}}>
                <div className='icon' style={isActive('/cobrar') ? { color: '#ceb375' } : {}}>
                  <TbCash  />
                </div>
                <div className='word'>
                  <p style={isActive('/cobrar') ? { color: '#ceb375' } : {}}>Cobranças</p>
                </div>
                <div className='hub' style={{ visibility: isActive('/cobrar') ? 'visible' : 'hidden' }}></div>
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
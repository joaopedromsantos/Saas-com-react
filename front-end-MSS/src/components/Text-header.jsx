import React from 'react'
import { useLocation } from "react-router-dom";

import './styles/Text-header.css'

function textHeader() {

    const location = useLocation();
    let pageName;
  
    switch(location.pathname) {
      case '/':
        pageName = 'Dashboards';
        break;
      case '/estoque':
        pageName = 'Fluxo de Estoque';
        break;
      case '/marcacao':
        pageName = 'Marcações';
        break;
      case '/cobrar':
        pageName = 'Cobranças';
        break;
      default:
        pageName = 'Página não encontrada';
    }

    return (
    <h2 id='page-name'>{pageName}</h2>
    )
}

export default textHeader
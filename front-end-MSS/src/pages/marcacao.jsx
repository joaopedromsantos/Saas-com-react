import TableMarcacao from '../components/table-marcacao'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PageName from '../components/Text-header.jsx';

import './style/marcacao.css'


 
function marcacao() {

  const [data, setData] = useState([]); // Adicione este estado para armazenar os dados da tabela

  const fetchData = async () => {
    const response = await fetch('http://localhost:3000/marcacao/getlist');
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    fetchData(); 
  }, []);
  

  return (
    <div id='geral'>
      <div id='element-central'>
            <div id='header-list'>
              <PageName />
            </div>       
            <div id='table'>
                <TableMarcacao data={data}  fetchData={fetchData}/>
            </div>
        </div>
    </div>
  )
}

export default marcacao
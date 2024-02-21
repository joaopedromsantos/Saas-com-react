import TableMarcacao from '../components/table-marcacao'
import { Button, ConfigProvider } from 'antd';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PageName from '../components/Text-header.jsx';

import './style/marcacao.css'


 
function marcacao() {

  const [data, setData] = useState([]); // Adicione este estado para armazenar os dados da tabela
  const [open, setOpen] = useState(false);

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
              <ConfigProvider
                    theme={{
                        token:{
                            colorPrimary: '#ceb375',
                            colorText: '#747682'
                        },
                        components: {
                            Button: {
                                defaultBg: '#18A16C',
                                defaultColor: '#fff',
                            },
                        },
                    }}
                >
                  <Button onClick={() => {setOpen(true)}} className="custom-button-add"> Adicionar Estoque </Button>
                </ConfigProvider> 
            </div>     
            <div id='table'>
                <TableMarcacao data={data}  fetchData={fetchData}/>
            </div>
        </div>
    </div>
  )
}

export default marcacao

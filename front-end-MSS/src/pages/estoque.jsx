import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PageName from '../components/Text-header.jsx';
import PageNameSecond from '../components/Text-header-second.jsx';
import TableEstoque from '../components/table-estoque.jsx';
import TableEstoqueTotal from '../components/table-estoque-total.jsx';
import FormEstoque from '../components/FormEstoque.jsx';

import './style/estoque.css'
import { Button, Form, InputNumber, Modal, Radio, ConfigProvider, Select , Spin} from 'antd';




function Estoque() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]); // Adicione este estado para armazenar os dados da tabela
    const [data_total, setDataTotal] = useState([]); // Adicione este estado para armazenar os dados da tabela

    const fetchDataEstoque = async () => {
      const response = await fetch('http://localhost:3000/estoque_total/getlist');
      const data_total = await response.json();
      setDataTotal(data_total);
  };

    const fetchData = async () => {
        const response = await fetch('http://localhost:3000/fluxo_estoque/getlist');
        const data = await response.json();
        setData(data);
    };

    useEffect(() => {
        fetchData();
        fetchDataEstoque()
    }, []);

    const onCreate = async (values) => {
        await fetchData();
        await fetchDataEstoque()
      setOpen(false);
    };    

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
                    <FormEstoque 
                      open={open}
                      setOpen={setOpen}
                      fetchData={fetchData}
                      fetchDataEstoque ={fetchDataEstoque}
                    />
                </ConfigProvider>
            </div>
            <div id='table'>
                <TableEstoque data={data}  fetchData={fetchData} fetchDataTotal={fetchDataEstoque}/>
            </div>
        </div>

        <div id='element-central'>
          <div id='header-list'>
              <PageNameSecond />
          </div>
          <div id='table'>
              <TableEstoqueTotal data={data_total}  fetchData={fetchDataEstoque} />
          </div>
        </div>
        </div>
    );
}

export default Estoque;

import React, { useState} from 'react';

import PageName from '../components/Text-header.jsx';
import PageNameSecond from '../components/Text-header-second.jsx';
import TableEstoque from '../components/table-estoque.jsx';
import TableEstoqueTotal from '../components/table-estoque-total.jsx';
import FormEstoque from '../components/FormEstoque.jsx';

import './style/estoque.css'
import { Button, ConfigProvider} from 'antd';




function Estoque() {
    const [open, setOpen] = useState(false);

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
                    />
                </ConfigProvider>
            </div>
            <div id='table'>
                <TableEstoque />
            </div>
        </div>

        <div id='element-central'>
          <div id='header-list'>
              <PageNameSecond />
          </div>
          <div id='table'>
              <TableEstoqueTotal />
          </div>
        </div>
        </div>
    );
}

export default Estoque;

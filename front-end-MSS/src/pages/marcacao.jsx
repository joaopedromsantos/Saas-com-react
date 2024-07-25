import TableMarcacao from '../components/table-marcacao'
import { Button, ConfigProvider } from 'antd';

import React, { useState} from 'react';

import FormMarcacao from '../components/FormMarcacao.jsx'

import PageName from '../components/Text-header.jsx';

import './style/marcacao.css'


 
function marcacao() {
  const [open, setOpen] = useState(false);

  return (
    <div className='geral'>
      <div className='element-central'>
            <div className='header-list'>
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
                  <Button onClick={() => {setOpen(true)}} className="custom-button-add"> Adicionar Marcação </Button>
                  <FormMarcacao 
                      open={open}
                      setOpen={setOpen}
                    />
                </ConfigProvider> 
            </div>     
            <div id='table'>
                <TableMarcacao />
            </div>
        </div>
    </div>
  )
}

export default marcacao

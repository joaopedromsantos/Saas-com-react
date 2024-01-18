import React from 'react';
import PageName from '../components/Text-header.jsx';
import TableEstoque from '../components/table-estoque.jsx';

import './style/estoque.css'
import { Button, ConfigProvider } from 'antd';

function Estoque() {
    return (
        <div id='element-central'>
            <div id='header-list'>
                <PageName />
                <ConfigProvider
                    theme={{
                        token:{
                            colorPrimary: '#18a06b',
                        },
                        components: {
                            Button: {
                                defaultBg: '#76CFAC',
                                defaultColor: '#fff',
                            },
                        },
                    }}
                >
                    <Button> Adicionar Estoque </Button>
                </ConfigProvider>
            </div>
            <div id='table'>
                <TableEstoque />
            </div>
        </div>
    );
}

export default Estoque;

import React, { useEffect, useState } from 'react';

import { Table, Space } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

function TableEstoque() {

    const [dataSource, setDataSource] = useState([]);
    const [empresaFilter, setEmpresaFilter] = useState([]);
    const [tipoFilter, setTipoFilter] = useState([]);
    const [kgFilter, setKgFilter] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3000/estoque_total/getlist');
            const data = await response.json();

            const empresas = [...new Set(data.map(item => item.empresa))].map(empresa => ({ text: empresa, value: empresa }));
            const tipos = [...new Set(data.map(item => item.tipo))].map(tipo => ({ text: tipo, value: tipo }));
            const kgs = [...new Set(data.map(item => item.kg))].map(kg => ({ text: kg, value: kg }));

            setEmpresaFilter(empresas);
            setTipoFilter(tipos);
            setKgFilter(kgs);
            setDataSource(data);
        };
        fetchData();
    }, []);

    const columns = [
        {
          title: 'Empresa',
          dataIndex: 'empresa',
          filters: empresaFilter,
          onFilter: (value, record) => record.empresa.indexOf(value) === 0,
        },
        {
          title: 'Tipo',
          dataIndex: 'tipo',
          filters: tipoFilter,
          onFilter: (value, record) => record.tipo.indexOf(value) === 0,
        },
        {
          title: 'Kg',
          dataIndex: 'kg',
          filters: kgFilter,
          onFilter: (value, record) => record.kg.indexOf(value) === 0,
        },
        {
          title: 'Quantidade',
          dataIndex: 'total',
          sorter: (a, b) => a.total - b.total,
        },
        {
          title: 'Ações',
          key: 'ações',
          render: () => (
              <Space size="middle">
                <DeleteOutlined style={{color:'red'}}/>
                <EditOutlined />
                <EyeOutlined />
              </Space>
          ),
        },
      ];
  

    return <Table dataSource={dataSource} columns={columns} />;
}

export default TableEstoque;

import React, { useEffect, useState } from 'react';
import { Table, Space, Popconfirm, Button } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

import './styles/Text-header.css'

function tableMarcacao({ data, fetchData }) {

  const [empresaFilter, setEmpresaFilter] = useState([]);
  const [tipoFilter, setTipoFilter] = useState([]);
  const [kgFilter, setKgFilter] = useState([]);

  const dataSource = data.map((item, index) => ({ key: index, ...item }));

  useEffect(() => {
    const empresas = [...new Set(data.map(item => item.empresa))].map(empresa => ({ text: empresa, value: empresa }));
    const tipos = [...new Set(data.map(item => item.tipo))].map(tipo => ({ text: tipo, value: tipo }));
    const kgs = [...new Set(data.map(item => item.kg))].map(kg => ({ text: kg, value: kg }));

    setEmpresaFilter(empresas);
    setTipoFilter(tipos);
    setKgFilter(kgs);
  }, [data]);

  const columns = [
    {
      title: 'OIC',
      dataIndex: 'oic'
    },
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
      dataIndex: 'quantidade',
      sorter: (a, b) => a.total - b.total,
    },

    {
      title: 'Cobrado',
      dataIndex: 'cobrado',
      render: (cobrado) => (
        cobrado ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />
      ),
    },
    {
      title: 'Data do Pedido',
      dataIndex: 'data_pedido',
      sorter: (a, b) => new Date(a.data) - new Date(b.data),
      render: (text) => (
        <span>{moment(text).format('DD/MM/YYYY | HH:mm')}</span>
      ),
    },
    {
      title: 'Ação',
      width: '1rem',
      align: 'center',
      key: 'ações',
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" onClick={() => handleEdit(record)}>
            <EditOutlined />
          </Button>
          <Button type="text" onClick={() => handleView(record)}>
            <EyeOutlined />
          </Button>
          <Popconfirm
            title="Deseja realmente excluir essa marcação?"
            onConfirm={() => handleDelete(record)}
            okText="  Sim"
            cancelText="Não"
          >
            <Button type="text" style={{color: 'red', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },

  ];



  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{
        defaultPageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30', '40'],
        showTotal: (total) => `Total: ${total}`,
      }}
    />
  );
}

export default tableMarcacao
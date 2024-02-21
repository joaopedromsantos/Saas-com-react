import React, { useEffect, useState } from 'react';
import { Table, Space, Popconfirm, Button, Input, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

import './styles/Text-header.css'

function tableMarcacao({ data, fetchData }) {

  const [empresaFilter, setEmpresaFilter] = useState([]);
  const [tipoFilter, setTipoFilter] = useState([]);
  const [kgFilter, setKgFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const dataSource = data.map((item, index) => ({ key: index, ...item }));

  useEffect(() => {
    const empresas = [...new Set(data.map(item => item.empresa))].map(empresa => ({ text: empresa, value: empresa }));
    const tipos = [...new Set(data.map(item => item.tipo))].map(tipo => ({ text: tipo, value: tipo }));
    const kgs = [...new Set(data.map(item => item.kg))].map(kg => ({ text: kg, value: kg }));

    setEmpresaFilter(empresas);
    setTipoFilter(tipos);
    setKgFilter(kgs);
  }, [data]);

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchTerm(selectedKeys[0]);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchTerm('');
  };

  const handleDelete = async (record) => {
    try {
      // Assuming record.id is the unique identifier for the item
      const response = await fetch(`http://localhost:3000/marcacao/delete/${record.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        message.success('Deletado com sucesso');
        fetchData();
      } else {
        message.error('Erro ao deletar marcação');
      }
    } catch (error) {
      console.error('Erro ao deletar fluxo:', error);
      message.error('An error occurred while deleting the item');
    }
  };


  const columns = [
    {
      title: 'Empresa',
      dataIndex: 'empresa',
      filters: empresaFilter,
      onFilter: (value, record) => record.empresa.indexOf(value) === 0,
      align:'center',
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      filters: tipoFilter,
      onFilter: (value, record) => record.tipo.indexOf(value) === 0,
      align:'center',
    },
    {
      title: 'Kg',
      dataIndex: 'kg',
      filters: kgFilter,
      onFilter: (value, record) => record.kg.indexOf(value) === 0,
      align:'center',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      sorter: (a, b) => a.quantidade - b.quantidade,
      align:'center',
    },

    {
      title: 'Cobrado',
      dataIndex: 'cobrado',
      render: (cobrado) => (
        cobrado ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />
      ),
      filters: [
        { text: 'Sim', value: true },
        { text: 'Não', value: false },
      ],
      onFilter: (value, record) => record.cobrado === value,
      align:'center',
    },
    {
      title: 'OIC',
      dataIndex: 'oic',
      align:'center',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
          type='info'
            placeholder="Digite o número OIC"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block'}}
          />
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Pesquisar
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Resetar
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.oic ? record.oic.toString().includes(value) : false,
    },
    {
      title: 'Data do Pedido',
      dataIndex: 'data_pedido',
      sorter: (a, b) => new Date(a.data_pedido) - new Date(b.data_pedido),
      render: (text) => (
        <span>{moment(text).format('DD/MM/YYYY | HH:mm')}</span>
      ),
      align:'center',
    },
    {
      title: 'Ação',
      width: '1rem',
      align: 'center',
      key: 'ações',
      render: (_, record) => (
        <Space style={{columnGap: '0px'}}>
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
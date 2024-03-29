import React, { useEffect, useState, useContext } from 'react';
import { Table, Space, Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { TableDataContext } from '../context/ThemeContext';

function TableEstoque() {
  const { tableData, updateTableData } = useContext(TableDataContext);
  const { data } = tableData;

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

  const handleDelete = async (record) => {
    try {
      // Assuming record.id is the unique identifier for the item
      const response = await fetch(`http://localhost:3000/fluxo_estoque/delete/${record.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await updateTableData();
        message.success('Deletado com sucesso!');
      } else {
        message.error('Erro ao deletar fluxo!');
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
      title: 'Data',
      dataIndex: 'data',
      sorter: (a, b) => new Date(a.data) - new Date(b.data),
      render: (text) => (
        <span>{moment(text).format('DD/MM/YYYY | HH:mm')}</span>
      ),
      align:'center',
    },
    {
      title: 'Ação',
      width: '1.5rem',
      align: 'center',
      key: 'ações',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Deseja realmente excluir essa chegada de estoque?"
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

export default TableEstoque;

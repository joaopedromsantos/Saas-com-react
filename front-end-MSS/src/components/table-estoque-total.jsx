import React, { useEffect, useState } from 'react';
import { Table } from 'antd';


function TableEstoque({ data, fetchData }) {
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
    }
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30', '40'],
        showTotal: (total) => `Total: ${total}`,
      }}
    />
  );
}

export default TableEstoque;

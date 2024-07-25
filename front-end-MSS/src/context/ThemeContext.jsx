// TableDataContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TableDataContext = createContext();

export const TableDataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [dataTotal, setDataTotal] = useState([]);
    const [dataMarcacao, setDataMarcacao] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [kgs, setKgs] = useState([]);
    const [tipos, setTipos] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:3000/fluxo_estoque/getlist');
        const data = await response.json();
        setData(data);
    };

    const fetchDataEstoque = async () => {
        const response = await fetch('http://localhost:3000/estoque_total/getlist');
        const dataTotal = await response.json();
        setDataTotal(dataTotal);
    };

    const fetchDataMarcacao = async () => {
        const response = await fetch('http://localhost:3000/marcacao/getlist');
        const dataMarcacao = await response.json();
        setDataMarcacao(dataMarcacao);
    };

    const fetchEmpresas = async () => {
        const response = await axios.get('http://localhost:3000/tabela_empresa/getlist');
        setEmpresas(response.data);
    };

    const fetchKgs = async () => {
        const response = await axios.get('http://localhost:3000/tabela_kg/getlist');
        setKgs(response.data);
    };

    const fetchTipos = async () => {
        const response = await axios.get('http://localhost:3000/tabela_tipo/getlist');
        setTipos(response.data);
    };

    const updateTableData = () => {
        fetchData();
        fetchDataEstoque();
        fetchDataMarcacao();
    };
    
    const updateTableMarcacao = () => {
        fetchDataMarcacao();
    };

    useEffect(() => {
        fetchData();
        fetchDataEstoque();
        fetchDataMarcacao();
        fetchEmpresas();
        fetchKgs();
        fetchTipos();
    }, []);

    const contextValue = {
        tableData: {
            data,
            dataTotal,
            dataMarcacao,
        },
        setTableData: ({ data, dataTotal }) => {
            setData(data);
            setDataTotal(dataTotal);
            setDataMarcacao(dataMarcacao);
        },
        fetchData,
        fetchDataEstoque,
        fetchDataMarcacao,
        updateTableData,
        empresas,
        kgs,
        tipos,
    };

    return (
        <TableDataContext.Provider value={contextValue}>
            {children}
        </TableDataContext.Provider>
    );
};

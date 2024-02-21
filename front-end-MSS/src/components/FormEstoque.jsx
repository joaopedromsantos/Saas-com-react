import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../pages/style/estoque.css'
import { Form, InputNumber, Modal, Select , Spin} from 'antd';

const FormEstoque = ({ open, setOpen, fetchData, fetchDataEstoque }) => {
    const [form] = Form.useForm();

    const [empresas, setEmpresas] = useState([]); // novo state para armazenar as empresas
    const [kgs, setKgs] = useState([]); // novo state para armazenar as kgs
    const [tipos, setTipo] = useState([]); // novo state para armazenar os tipos
    const [loading, setLoading] = useState(false);

    // novo useEffect para buscar as empresas
    useEffect(() => {
        axios.get('http://localhost:3000/tabela_empresa/getlist')
            .then((response) => {
                setEmpresas(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar empresas: ", error);
            });
    }, []);

    // novo useEffect para buscar os kg
    useEffect(() => {
        axios.get('http://localhost:3000/tabela_kg/getlist')
            .then((response) => {
                setKgs(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar Kgs: ", error);
            });
    }, []);

    // novo useEffect para buscar os tipos
    useEffect(() => {
        axios.get('http://localhost:3000/tabela_tipo/getlist')
            .then((response) => {
                setTipo(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar Tipos: ", error);
            });
    }, []);
  
    useEffect(() => {
      fetchData(); 
    }, []);
    
    const onCreate = async (values) => {
      await fetchData();
      setOpen(false);
    };
    const onCancel = () => {
        setOpen(false);
    }


  return (
    <Modal
        title="Adicionar Estoque"
        okText="Adicionar"
        cancelText="Cancelar"
        open={open}
        onCancel={onCancel}
        onOk={() => {
        form
            .validateFields()
            .then((values) => {
            form.resetFields();
            setLoading(true); // Use setLoading instead of setSpinning

            // Chame a função Axios aqui
            axios.post('http://localhost:3000/fluxo_estoque/create', values)
                .then(response => {
                console.log(response);
                // Você pode adicionar mais lógica aqui, como fechar o modal
                fetchData();
                fetchDataEstoque();
                })
                .catch(error => {
                console.log(error);
                // Trate os erros aqui
                })
                .finally(() => {
                setLoading(false); // Desative o spinner, whether it's successful or not
                });

            onCreate(values);
            })
            .catch((info) => {
            console.log('Validate Failed:', info);
            });
        }}
        okButtonProps={{ className: 'ok-button' }}
        cancelButtonProps={{ className: 'cancel-button' }}
    >
        <Spin spinning={loading}>
        <Form
        form={form}
        layout="vertical"
        name="form_estoque"
        initialValues={{
            modifier: 'public',
        }}
        >
        <Form.Item
            name="empresa"
            label="Empresa"
            rules={[
            {
                required: true,
                message: 'Selecione a empresa dona da sacaria!',
            },
            ]}
        >
            <Select placeholder="Selecione uma empresa">
                {empresas.map((empresa) => (
                    <Option key={empresa.id} value={empresa.id}>{empresa.nome}</Option>
                ))}
            </Select>
        </Form.Item>

        <Form.Item
            name="kg"
            label="KG"
            rules={[
            {
                required: true,
                message: 'Selecione de quantos KG é a sacaria!',
            },
            ]}
        >
            <Select placeholder="Selecione a KG da sacaria">
                {kgs.map((kg) => (
                    <Option key={kg.id} value={kg.id}>{kg.nome}</Option>
                ))}
            </Select>
        </Form.Item>

        <Form.Item
            name="tipo"
            label="Tipo de Sacaria"
            rules={[
            {
                required: true,
                message: 'Selecione o tipo da sacaria!',
            },
            ]}
        >
            <Select placeholder="Selecione o tecido da sacaria">
                {tipos.map((tipo) => (
                    <Option key={tipo.id} value={tipo.id}>{tipo.nome}</Option>
                ))}
            </Select>
        </Form.Item>

        <Form.Item 
            name="quantidade" 
            label="Quantidade"
            rules={[
                {
                required: true,
                message: 'Digite a quantidade de sacarias recebidas!',
                },
                {
                validator: (_, value) =>
                    value === 0 ? Promise.reject(new Error('Zero não é um valor válido!')) : Promise.resolve(),
                },
            ]}
            >
                <InputNumber />
            </Form.Item>
        </Form>
        </Spin>
    </Modal>
    )
}

export default FormEstoque
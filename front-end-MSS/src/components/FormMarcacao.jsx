import React, { useState, useContext } from 'react';
import axios from 'axios';

import { TableDataContext } from '../context/ThemeContext';

import { Form, InputNumber, Modal, Select , Spin, message } from 'antd';

const FormMarcacao = ({ open, setOpen }) => {
    const { updateTableData, updateTableMarcacao, empresas, kgs, tipos } = useContext(TableDataContext);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onCreate = async (values) => {
      setOpen(false);
    };
    const onCancel = () => {
        setOpen(false);
    }


  return (
    <Modal
        title="Adicionar Marcação"
        okText="Adicionar"
        cancelText="Cancelar"
        open={open}
        onCancel={onCancel}
        onOk={() => {
        form
            .validateFields()
            .then((values) => {
            form.resetFields();
            setLoading(true);

            // Chame a função Axios aqui
            axios.post('http://localhost:3000/marcacao/create', values)
                .then(response => {
                    updateTableData();
                    updateTableMarcacao();
                    message.success('Criado com sucesso!');
                })
                .catch(error => {
                    console.log(error);
                    message.success('Erro na criação!');
                })
                .finally(() => {
                    setLoading(false);
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
            name="form_marcacao"
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

export default FormMarcacao
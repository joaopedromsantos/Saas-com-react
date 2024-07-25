import React, { useState, useContext } from 'react';
import axios from 'axios';

import { TableDataContext } from '../context/ThemeContext';

import { Form, InputNumber, Modal, Select , Spin, message, Radio, Popconfirm, Input, Collapse } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Option } = Select;

const FormMarcacao = ({ open, setOpen }) => {
    const { updateTableData, empresas, kgs, tipos } = useContext(TableDataContext);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [radioValue, setRadioValue] = useState(false);

    const { Panel } = Collapse;

    const handleRadioChange = (e) => {
        const value = e.target.value;
        setRadioValue(value); // Atualiza o estado radioValue com o valor selecionado
        setConfirmVisible(value); // Atualiza o estado confirmVisible com o valor selecionado
    };

    const handleConfirm = () => {
        setConfirmVisible(false);
        setRadioValue(true);
    };

    const handleCancel = () => {
        setConfirmVisible(false);
        setRadioValue(false);
    };

    const onCreate = async (values) => {
      setOpen(false);
    };

    const onCancel = () => {
        if(!confirmVisible){
            setOpen(false);
        }
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
                    message.success('Criado com sucesso!');
                })
                .catch(error => {
                    console.log(error);
                    message.error('Erro na criação!');
                })
                .finally(() => {
                    setLoading(false);
                });

            onCreate(values);
            })
            .catch((info) => {
                console.log(radioValue)
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
            <Select placeholder="Selecione o KG da sacaria">
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
            name="oic" 
            label="OIC"
            rules={[
                {
                    required: true,
                    message: 'Digite o OIC, caso não tenha OIC digite "0000" por padrão!',

                },
                {
                    pattern: new RegExp(/^\d{4}$/),
                    message: 'O OIC deve ser um número de 4 dígitos!',
                },
            ]}
            >
                <Input maxLength={4} />
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

        <Collapse>
            <Collapse.Panel header="Mostrar mais opções" key="1">
                <Form.Item 
                    name="observacoes" 
                    label="Observações"
                    rules={[
                        {
                        required: false,
                        message: 'Digite alguma observação',
                        }
                    ]}
                >
                    <TextArea rows={4}/>
                </Form.Item>

                <Form.Item 
                    name="email" 
                    label="Link do E-mail"
                    rules={[
                        {
                        required: false,
                        message: 'Cole o link do e-mail correspondente ao pedido',
                        }
                    ]}
                >
                    <Input placeholder="Cole o link do e-mail do pedido" />
                </Form.Item>

                <Form.Item 
                    name="cobrado" 
                    label="Já foi pago:"
                    rules={[
                        {
                        required: false,
                        defaultField: true,
                        initialValue: false,
                        message: 'Selecione a opção correta',
                        }
                    ]}
                >
                    <Popconfirm
                        title="Realmente foi cobrado?"
                        open={confirmVisible}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        okText="Sim"
                        cancelText="Não"
                        okButtonProps={{ className: 'ok-button' }}
                        cancelButtonProps={{ className: 'cancel-button' }}
                    >
                        <Radio.Group onChange={handleRadioChange} value={radioValue}>
                            <Radio value={false}> Não </Radio>
                            <Radio value={true}> Sim </Radio>
                        </Radio.Group>
                    </Popconfirm>
                </Form.Item>
            </Collapse.Panel>
        </Collapse>

        </Form>
        </Spin>
    </Modal>
    )
}

export default FormMarcacao
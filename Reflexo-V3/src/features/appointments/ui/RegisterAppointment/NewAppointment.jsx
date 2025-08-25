import React, { useState, useEffect } from 'react';
//import DateSearch from "../../../../components/DateSearch/CustomTimeFilter;//
import {
    ConfigProvider,
    Form,
    Button,
    Input,
    DatePicker,
    Radio,
    Select,
    Switch,
    TimePicker,
    Checkbox,
} from 'antd';
import styles from './NewAppointment.module.css';

const { Option } = Select;

const NewAppointment = () => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showHour, setShowHour] = useState(false);
    const [patientType, setPatientType] = useState('nuevo');
    const [darkMode, setDarkMode] = useState(false);

    const paymentPrices = {
        '1': 50.0,
        '2': 0.0,
        '3': 100.0,
        '4': 100.0,
        '5': 100.0,
        '6': 100.0,
    };

    useEffect(() => {
        document.documentElement.classList.toggle('dark-theme', darkMode);
    }, [darkMode]);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: 'var(--color-primary)',
                    colorBgContainer: 'var(--color-bg)',
                    colorText: 'var(--color-text)',
                    colorBorder: 'var(--color-border)',
                    colorBgElevated: 'var(--color-bg)',
                },
            }}
        >
            <div className={styles.container}>
                <h2 className={styles.title}>Nueva Cita</h2>

                <Form layout="vertical">
                    {/* Fecha */}
                    <Form.Item label="Fecha de la cita" required>
                        <DatePicker style={{ width: '75%' }} />
                    </Form.Item>

                    {/* Paciente */}
                    <Form.Item label="Paciente" required>
                        <div className={styles.patientSection}>
                            <Radio.Group
                                value={patientType}
                                onChange={(e) => setPatientType(e.target.value)}
                                className={styles.patientType}
                            >
                                <Radio value="nuevo">Nuevo</Radio>
                                <Radio value="continuador">Continuador</Radio>
                            </Radio.Group>


                            <div className={styles.patientButtons}>

                                {patientType === 'nuevo' ? (
                                    <Button type="link">Crear Paciente</Button>
                                ) : (
                                    <Button type="link">Seleccionar </Button>
                                )}
                            </div>
                            <Input placeholder="" disabled />
                        </div>
                    </Form.Item>

                    {/* Opciones de pago */}
                    <Form.Item label="Opciones de pago" required>
                        <Select style={{width:'75%'}}
                            placeholder="Opciones de pago"
                            onChange={(value) => setSelectedPayment(value)}
                        >
                            <Option value="1">SERVICIO BASICO</Option>
                            <Option value="2">CUPON SIN COSTO</Option>
                            <Option value="3">SERVICIO PREMIUM</Option>
                            <Option value="4">SERVICIO ULTRA PREMIUM</Option>
                            <Option value="5">TARIFA PERSONALIZADA</Option>
                            <Option value="6">IBALA</Option>
                        </Select>
                    </Form.Item>

                    {/* Monto */}
                    <Form.Item required noStyle>
                        <Input style={{width:'75%'}}
                            disabled
                            placeholder="$0.00"
                            value={
                                selectedPayment
                                    ? `$${paymentPrices[selectedPayment].toFixed(2)}`
                                    : ''
                            }
                        />
                    </Form.Item>

                    {/* Método de pago */}
                    <Form.Item label="Método de Pago" required>
                        <Select placeholder="Seleccione método de pago" style={{width:'75%'}}>
                            <Option value="efectivo">Efectivo</Option>
                            <Option value="tarjeta">Tarjeta</Option>
                            <Option value="transferencia">Transferencia</Option>
                        </Select>
                    </Form.Item>

                    {/* Hora (opcional) */}
                    {showHour && (
                        <Form.Item label="Hora de la cita">
                            <TimePicker style={{ width: '75%' }} />
                        </Form.Item>
                    )}

                    <Form.Item>
                        <Checkbox
                            checked={showHour}
                            onChange={(e) => setShowHour(e.target.checked)}
                        >
                            {showHour ? 'Ocultar Hora' : 'Mostrar Hora'}
                        </Checkbox>
                    </Form.Item>

                    {/* Botones */}
                    <Form.Item className={styles.buttonGroup}>
                        <Button type="primary" htmlType="submit" className={styles.submitButton}>
                            Registrar
                        </Button>
                        <Button htmlType="button" className={styles.cancelButton}>
                            Cancelar
                        </Button>
                    </Form.Item>

                    {/* Switch modo oscuro */}
                    <Form.Item>
                        <Switch
                            checked={darkMode}
                            onChange={setDarkMode}
                            checkedChildren="🌙 Modo Oscuro"
                            unCheckedChildren="☀️ Modo Claro"
                        />
                    </Form.Item>
                </Form>
            </div>
        </ConfigProvider>
    );
};

export default NewAppointment;

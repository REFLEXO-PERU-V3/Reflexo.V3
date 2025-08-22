import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';

const { Option } = Select;

export const SelectPaymentStatus = ({ value, onChange, placeholder = 'Estado de pago', disabled = false }) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Simulando carga de datos
    setTimeout(() => {
      setOptions([
        { value: 'PAID', label: 'Pagado' },
        { value: 'PENDING', label: 'Pendiente' },
        { value: 'PARTIAL', label: 'Pago parcial' },
        { value: 'CANCELLED', label: 'Cancelado' }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleChange = (newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      style={{ width: '100%' }}
      loading={loading}
      disabled={disabled}
      notFoundContent={loading ? <Spin size="small" /> : null}
    >
      {options.map(option => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};
import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';

const { Option } = Select;

export const SelectTypeOfDocument = ({ value, onChange, placeholder = 'Tipo de documento', disabled = false }) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Simulando carga de datos
    setTimeout(() => {
      setOptions([
        { value: 'DNI', label: 'DNI' },
        { value: 'CE', label: 'Carnet de Extranjería' },
        { value: 'PASAPORTE', label: 'Pasaporte' },
        { value: 'OTRO', label: 'Otro' }
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
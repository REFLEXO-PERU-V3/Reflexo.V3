import { Input, Select } from 'antd';
import { useEffect, useState, useCallback } from 'react';
//import { getPredeterminedPrices } from './SelectsApi';

const { Option } = Select;

// Fallback seguro: evita ReferenceError si no existe SelectsApi
const getPredeterminedPrices = async () => {
  // Retorna una lista mínima estática; ajusta según tu backend si es necesario
  return [
    { value: 'service_1', label: 'Sesión Básica', price: '50' },
    { value: 'service_2', label: 'Sesión Avanzada', price: '80' },
    { value: 'service_3', label: 'Sesión Premium', price: '120' },
  ];
};

const SelectPrices = ({
  onChange,
  onPriceChange,
  value,
  initialPrice = '',
  ...rest
}) => {
  const [prices, setPrices] = useState([]);
  const [inputPrice, setInputPrice] = useState(initialPrice);
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const priceOptions = await getPredeterminedPrices();
        setPrices(priceOptions);
      } catch (error) {
        console.error('Error al obtener precios:', error);
      }
    };
    fetchPrices();
  }, []);

  useEffect(() => {
    setInputPrice(initialPrice);
  }, [initialPrice]);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleSelectChange = useCallback((selectedValue) => {
    const selected = prices.find((item) => item.value === selectedValue);
    const newPrice = selected?.price || '';
    setInputPrice(newPrice);
    setInternalValue(selectedValue);
    if (onChange) onChange(selectedValue);
    if (onPriceChange) onPriceChange(newPrice);
  }, [prices, onChange, onPriceChange]);

  const handleInputChange = useCallback((e) => {
    const newValue = e.target.value;
    setInputPrice(newValue);
    if (onPriceChange) onPriceChange(newValue);
  }, [onPriceChange]);

  return (
    <div>
      <Select
        onChange={handleSelectChange}
        value={internalValue}
        allowClear
        {...rest}
      >
        {prices.map((item) => (
          <Option key={item.value} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>

      {!rest.hidePriceInput && (
        <Input value={inputPrice} prefix="S/" onChange={handleInputChange} />
      )}
    </div>
  );
};

export default SelectPrices;
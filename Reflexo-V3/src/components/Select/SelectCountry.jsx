import { ConfigProvider, Select } from 'antd';
import { useEffect, useState, useCallback } from 'react';
import { getCountries } from './SelectsApi';

export function SelectCountries({ value, onChange, ...rest }) {
  const [options, setOptions] = useState([]);
  const [internalValue, setInternalValue] = useState(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const data = await getCountries();
        const formattedOptions = data.map((pais) => ({
          label: <span style={{ color: '#fff' }}>{pais.name}</span>,
          value: String(pais.id),
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error('Error al obtener países:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setInternalValue(String(value));
    } else {
      setInternalValue(undefined);
    }
  }, [value]);

  const handleChange = useCallback(
    (val) => {
      setInternalValue(val);
      if (onChange) onChange(val);
    },
    [onChange]
  );

  const filterOption = useCallback(
    (input, option) =>
      (option?.label?.props?.children ?? '')
        .toLowerCase()
        .includes(input.toLowerCase()),
    []
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            colorPrimary: '#FFFFFFFF',
            optionSelectedBg: '#333333',
            colorText: '#fff',
            colorBgElevated: '#444444',
            colorTextPlaceholder: '#aaa',
            controlItemBgHover: '#1a1a1a',
            selectorBg: '#444444',
          },
        },
        token: {
          colorTextBase: '#fff',
        },
      }}
    >
      <Select
        {...rest}
        value={internalValue}
        onChange={handleChange}
        showSearch
        filterOption={filterOption}
        placeholder="País"
        options={options}
        loading={loading}
        style={{
          width: '100%',
        }}
      />
    </ConfigProvider>
  );
}

export default SelectCountries;
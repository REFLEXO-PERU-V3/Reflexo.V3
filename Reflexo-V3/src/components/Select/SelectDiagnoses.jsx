import { ConfigProvider, Select } from 'antd';
import { useEffect, useState, useCallback } from 'react';
import { getDiagnoses } from './SelectsApi';

export function SelectDiagnoses({ value, onChange, ...rest }) {
  const [options, setOptions] = useState([]);
  const [internalValue, setInternalValue] = useState(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      setLoading(true);
      try {
        const data = await getDiagnoses();
        const formattedOptions = data.map((diagnosis) => ({
          label: <span style={{ color: '#fff' }}>{diagnosis.name}</span>,
          value: String(diagnosis.id),
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error('Error al obtener diagnósticos:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDiagnoses();
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
        placeholder="Diagnóstico"
        options={options}
        loading={loading}
        style={{
          width: '100%',
        }}
      />
    </ConfigProvider>
  );
}

export default SelectDiagnoses;
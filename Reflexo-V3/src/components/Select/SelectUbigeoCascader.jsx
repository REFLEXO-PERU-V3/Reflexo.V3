import { Cascader, ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import {
  getDepartaments,
  getDistricts,
  getProvinces,
} from '../Select/SelectsApi';

const SelectUbigeoCascader = ({ value, onChange, ...rest }) => {
  const [options, setOptions] = useState([]);
  const [loadingUbigeo, setLoadingUbigeo] = useState(false);
  const [cascaderValue, setCascaderValue] = useState([]);

  const getCascaderValueFromObject = (ubigeoObj) => {
    if (!ubigeoObj) return [];
    return [
      ubigeoObj.region_id,
      ubigeoObj.province_id,
      ubigeoObj.district_id,
    ].filter(Boolean);
  };

  const getUbigeoObjectFromValue = (cascaderValue) => {
    return {
      region_id: cascaderValue[0] || null,
      province_id: cascaderValue[1] || null,
      district_id: cascaderValue[2] || null,
    };
  };

  // Cargar departamentos al inicio
  useEffect(() => {
    const loadDepartments = async () => {
      const departamentos = await getDepartaments();
      setOptions(
        departamentos.map((d) => ({
          label: d.name,
          value: String(d.id),
          isLeaf: false,
        })),
      );
    };
    loadDepartments();
  }, []);

  // Cargar árbol completo en modo edición
  useEffect(() => {
    const loadFullUbigeoTree = async () => {
      if (value && value.region_id && value.province_id && value.district_id) {
        setLoadingUbigeo(true);

        const departamentos = await getDepartaments();
        const regionOption = departamentos.find(
          (d) => String(d.id) === String(value.region_id),
        );
        let regionNode = {
          label: regionOption ? regionOption.name : value.region_id,
          value: String(value.region_id),
          isLeaf: false,
        };

        const provincias = await getProvinces(value.region_id);
        const provinceOption = provincias.find(
          (p) => String(p.id) === String(value.province_id),
        );
        let provinceNode = {
          label: provinceOption ? provinceOption.name : value.province_id,
          value: String(value.province_id),
          isLeaf: false,
        };

        const distritos = await getDistricts(value.province_id);
        const districtOption = distritos.find(
          (d) => String(d.id) === String(value.district_id),
        );
        let districtNode = {
          label: districtOption ? districtOption.name : value.district_id,
          value: String(value.district_id),
          isLeaf: true,
        };

        provinceNode.children = [districtNode];
        regionNode.children = [provinceNode];

        const optionsTree = departamentos.map((d) => ({
          label: d.name,
          value: String(d.id),
          isLeaf: false,
          children:
            String(d.id) === String(value.region_id)
              ? [provinceNode]
              : undefined,
        }));

        setOptions(optionsTree);
        setCascaderValue([
          String(value.region_id),
          String(value.province_id),
          String(value.district_id),
        ]);

        setLoadingUbigeo(false);
      }
    };

    if (value && value.region_id && value.province_id && value.district_id) {
      loadFullUbigeoTree();
    }
  }, [value]);

  // Sincronizar cascaderValue
  useEffect(() => {
    if (!value || (!value.region_id && !value.province_id && !value.district_id)) {
      setCascaderValue([]);
    } else if (
      (!value.province_id || !value.district_id) &&
      (!cascaderValue.length || cascaderValue[0] !== value.region_id)
    ) {
      setCascaderValue(getCascaderValueFromObject(value));
    }
  }, [value]);

  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    try {
      if (selectedOptions.length === 1) {
        const provinces = await getProvinces(targetOption.value);
        targetOption.children = provinces.map((p) => ({
          label: p.name,
          value: String(p.id),
          isLeaf: false,
        }));
      } else if (selectedOptions.length === 2) {
        const districts = await getDistricts(targetOption.value);
        targetOption.children = districts.map((d) => ({
          label: d.name,
          value: String(d.id),
          isLeaf: true,
        }));
      }
      setOptions([...options]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      targetOption.loading = false;
    }
  };

  const handleChange = (newCascaderValue, selectedOptions) => {
    setCascaderValue(newCascaderValue);
    if (onChange) {
      onChange(getUbigeoObjectFromValue(newCascaderValue), selectedOptions);
    }
  };

  const filter = (inputValue, path) =>
    path.some((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );

  return (
    <ConfigProvider
      theme={{
        components: {
          Cascader: {
            colorBgElevated: '#ffffffff', // ✅ Fondo blanco
            colorText: '#000000', // ✅ Texto negro
            colorTextPlaceholder: '#8c8c8c',
            colorTextDisabled: '#bfbfbf',
            controlItemBgHover: '#f5f5f5',
            colorPrimary: '#1890ff',
            colorBorder: '#d9d9d9',
            colorIcon: '#000000',
            colorIconHover: '#1890ff',
            borderRadius: 6,
            controlHeight: 38,
            optionSelectedBg: '#f0f0f0',
            optionActiveBg: '#f5f5f5',
            colorScrollbarThumb: '#d9d9d9',
            colorScrollbarTrack: '#f5f5f5',
          },
        },
      }}
    >
      <Cascader
        options={options}
        loadData={loadData}
        onChange={handleChange}
        changeOnSelect
        showSearch={{ filter }}
        placeholder="Seleccione departamento / provincia / distrito"
        style={{
          width: '100%',
          backgroundColor: '#ffffff', // ✅ Fondo blanco
          color: '#000000', // ✅ Texto negro
          borderRadius: 6,
          border: '1px solid #d9d9d9',
        }}
        dropdownStyle={{
          backgroundColor: '#ffffff', // ✅ Fondo blanco
          color: '#000000', // ✅ Texto negro
          borderRadius: 6,
          border: '1px solid #d9d9d9',
        }}
        value={cascaderValue}
        disabled={loadingUbigeo}
        {...rest}
      />
    </ConfigProvider>
  );
};

export default SelectUbigeoCascader;

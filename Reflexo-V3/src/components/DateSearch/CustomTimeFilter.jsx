import styles from './CustomTimeFilter.module.css';
import { ConfigProvider, DatePicker, theme as antdTheme } from 'antd';
import es_ES from 'antd/es/locale/es_ES'; // Import limpio
import dayjs from 'dayjs';
import { useState } from 'react';
import { useTheme } from "../../features/themeContext/themeContext";

const CustomTimeFilter = ({
    onDateChange,
    size = 'large',
    defaultValue = dayjs(),
}) => {
    const [selectDate, setSelectDate] = useState(defaultValue);
    const { theme } = useTheme(); // 👈 Obtiene el tema del contexto

    const handleDateChange = (date) => {
        setSelectDate(date);
        if (date) {
            const formattedDate = date.format('YYYY-MM-DD');
            onDateChange(formattedDate);
        } else {
            onDateChange(null);
        }
    };

    // 🟢 Objeto de configuración de tema para Ant Design
    const antdThemeConfig = {
      token: {
        colorBgContainer: theme === 'dark' ? '#1f1f1f' : '#fff',
        colorText: theme === 'dark' ? '#fff' : '#000',
        colorBorder: theme === 'dark' ? '#444' : '#d9d9d9',
        colorTextPlaceholder: theme === 'dark' ? '#aaa' : '#bfbfbf',
        colorPrimary: '#00AA55', // color de selección
        colorBgElevated: theme === 'dark' ? '#1a1a1a' : '#fff', // fondo del calendario
        colorTextHeading: theme === 'dark' ? '#fff' : '#000', // texto del calendario (mes, año)
        colorTextDisabled: theme === 'dark' ? '#666' : '#ccc',
        colorSplit: theme === 'dark' ? '#333' : '#ddd',
        cellHoverBg: theme === 'dark' ? 'rgba(0, 170, 85, 0.2)' : 'rgba(0, 170, 85, 0.2)',
      },
      algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    };

    return (
        <ConfigProvider locale={es_ES} theme={antdThemeConfig}>
            <DatePicker
                className={styles.datePicker}
                size={size}
                onChange={handleDateChange}
                value={selectDate}
                placeholder="Filtrar fecha"
                allowClear
                format="YYYY-MM-DD"
                aria-label="Selector de fecha para filtrar resultados"
            />
        </ConfigProvider>
    );
};

export default CustomTimeFilter;

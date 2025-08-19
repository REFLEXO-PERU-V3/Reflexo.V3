import styles from './CustomTimeFilter.module.css';
import { ConfigProvider, DatePicker } from 'antd';
import es_ES from 'antd/es/locale/es_ES'; // Import limpio
import dayjs from 'dayjs';
import { useState } from 'react';

const CustomTimeFilter = ({
    onDateChange,
    size = 'large',
    defaultValue = dayjs(), // Permite valor inicial externo
}) => {
    const [selectDate, setSelectDate] = useState(defaultValue);

    // Maneja el cambio de fecha y lo formatea
    const handleDateChange = (date) => {
        setSelectDate(date);
        if (date) {
            const formattedDate = date.format('YYYY-MM-DD');
            onDateChange(formattedDate);
        } else {
            onDateChange(null);
        }
    };

    return (
        <ConfigProvider
            locale={es_ES}
            theme={{
                components: {
                    DatePicker: {
                        colorTextPlaceholder: '#555555',
                        colorBgContainer: '#F5F5F5',
                        colorText: '#000000',
                        colorBorder: '#CCCCCC',
                        borderRadius: 6,
                        hoverBorderColor: '#00AA55',
                        activeBorderColor: '#00AA55',
                        colorIcon: '#000000',
                        colorIconHover: '#00AA55',
                        colorBgElevated: '#FFFFFF',
                        colorPrimary: '#00AA55',
                        colorTextDisabled: '#AAAAAA',
                        colorTextHeading: '#000000',
                        cellHoverBg: '#00AA55',
                        colorSplit: '#DDDDDD',
                    },
                },
            }}
        >
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

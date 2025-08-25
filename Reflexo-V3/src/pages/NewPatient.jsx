import { Button } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useTheme } from '../context/ThemeContext';
import FormGenerator from '../components/Form/Form';
import styles from './css/NewPatient.module.css';

const fields = [
  // TÍTULO
  { type: 'title', label: 'Nuevo paciente' },

// Primera fila — manual
  {
    type: 'customRow',
    fields: [
      { name: 'documentType', label: 'Tipo de Documento', type: 'select', options: [{ value: 'dni', label: 'DNI' }], span: 8 },
      { name: 'documentNumber', label: 'N° Documento', type: 'text', required: true, span: 8 },
    ]
  },

  // Segunda fila
  { name: 'lastName', label: 'Apellido Paterno', type: 'text', required: true, span: 8 },
  { name: 'motherLastName', label: 'Apellido Materno', type: 'text', span: 8 },
  { name: 'name', label: 'Nombre', type: 'text', required: true, span: 8 },

  // Tercera fila
  { name: 'birthDate', label: 'Fecha de Nacimiento', type: 'date', span: 8 },
  { name: 'gender', label: 'Sexo', type: 'select', options: [{ value: 'M', label: 'Masculino' }, { value: 'F', label: 'Femenino' }], span: 8 },
  { name: 'occupation', label: 'Ocupación', type: 'text', span: 8 },

  // TÍTULO
  { type: 'title', label: 'Información de contacto' },

  // Cuarta fila
  { name: 'phone', label: 'Teléfono', type: 'text', required: true, span: 8 },
  { name: 'email', label: 'Correo Electrónico', type: 'text', span: 16 },

  // Quinta fila
  { name: 'ubigeo', label: 'Ubicación', type: 'ubigeo', span: 12 },
  { name: 'address', label: 'Dirección de Domicilio', type: 'text', span: 12 },
];

const NewPatient = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.pageContainer} data-theme={theme}>
      <div className={styles.header}>
        <Button 
          className={styles.themeToggle}
          icon={theme === 'dark' ? <BulbOutlined /> : <BulbFilled />}
          onClick={toggleTheme}
          type="text"
        />
      </div>
      <FormGenerator fields={fields} />
    </div>
  );
};

export default NewPatient;
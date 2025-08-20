/**
 * Componente Input.jsx - Sistema de Componentes de Entrada Personalizados
 * 
 * Este archivo contiene un sistema completo de componentes de entrada reutilizables
 * que manejan diferentes tipos de datos como texto, fechas, selecciones, etc.
 * Utiliza Ant Design como base y proporciona estilos personalizados.
 * 
 * @author Reflexo Team
 * @version 3.0
 */

// ============================================================================
// IMPORTS Y DEPENDENCIAS
// ============================================================================

// Iconos de Ant Design
import { CheckCircleFilled } from '@ant-design/icons';

// Componentes principales de Ant Design
import {
  Button,
  Checkbox,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
  theme,
} from 'antd';

// Estilos CSS modulares
import styles from '../Input/Input.module.css';

// Componentes de selección personalizados
import { SelectTypeOfDocument } from '../Select/SelctTypeOfDocument';
import { SelectCountries } from '../Select/SelectCountry';
import { SelectDiagnoses } from '../Select/SelectDiagnoses';
import { SelectPaymentStatus } from '../Select/SelectPaymentStatus';
import SelectPrices from '../Select/SelectPrices';
import SelectUbigeoCascader from '../Select/SelectUbigeoCascader';

// Desestructuración de componentes de Ant Design
const { Option } = Select;

// ============================================================================
// COMPONENTE PRINCIPAL - InputField
// ============================================================================

/**
 * Componente principal que renderiza diferentes tipos de campos de entrada
 * basándose en la propiedad 'type' proporcionada.
 * 
 * @param {string} type - Tipo de campo a renderizar
 * @param {object} form - Instancia del formulario de Ant Design
 * @param {string} label - Etiqueta del campo
 * @param {array} options - Opciones para campos de selección
 * @param {boolean} isPhoneField - Indica si es un campo de teléfono especial
 * @param {boolean} isPhoneRequired - Indica si el teléfono es obligatorio
 * @param {function} togglePhoneRequired - Función para alternar requerimiento de teléfono
 * @param {object} rest - Propiedades adicionales
 * @returns {JSX.Element} Componente de entrada renderizado
 */
const InputField = ({
  type,
  form,
  label,
  options = [],
  isPhoneField = false,
  isPhoneRequired,
  togglePhoneRequired,
  ...rest
}) => {
  let inputComponent;

  // Configuración base de propiedades para todos los inputs
  const inputProps = {
    className: styles.inputStyle,
    ...rest,
  };

  // ============================================================================
  // SWITCH PRINCIPAL - Manejo de diferentes tipos de entrada
  // ============================================================================
  
  switch (type) {
    // ============================================================================
    // CAMPOS DE SELECCIÓN ESPECIALIZADOS
    // ============================================================================
    
    case 'selestCountry':
      // Selector de países con componente personalizado
      return <SelectCountries />;

    case 'ubigeo':
      // Selector de ubicación geográfica (Perú)
      return (
        <Form.Item
          name="ubicacion"
          rules={[
            { required: true, message: 'Por favor seleccione la ubicación' },
          ]}
        >
          <SelectUbigeoCascader value={rest.value} onChange={rest.onChange} />
        </Form.Item>
      );

    case 'diagnoses':
      // Selector de diagnósticos médicos
      return <SelectDiagnoses />;

    case 'typeOfDocument':
      // Selector de tipo de documento de identidad
      return (
        <SelectTypeOfDocument value={rest.value} onChange={rest.onChange} />
      );

    // ============================================================================
    // CAMPOS NUMÉRICOS CON VALIDACIÓN
    // ============================================================================
    
    case 'documentNumber':
      // Campo para número de documento (solo números, máximo 9 dígitos)
      inputComponent = (
        <Input
          {...inputProps}
          onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
          onChange={(e) => {
            const cleanValue = e.target.value.replace(/\D/g, '');
            e.target.value = cleanValue;
            if (rest.onChange) rest.onChange(cleanValue);
          }}
          maxLength={9}
        />
      );
      break;

    case 'phoneNumber':
      // Campo para número de teléfono (solo números, máximo 9 dígitos)
      inputComponent = (
        <Input
          {...inputProps}
          onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
          onChange={(e) => {
            const cleanValue = e.target.value.replace(/\D/g, '');
            e.target.value = cleanValue;
            if (rest.onChange) rest.onChange(cleanValue);
          }}
          maxLength={9}
        />
      );
      break;

    // ============================================================================
    // CAMPOS DE PAGO Y FINANZAS
    // ============================================================================
    
    case 'paymentStatus':
      // Selector de estado de pago
      return (
        <Form.Item
          label="Metodos de Pago:"
          name="payment"
          rules={[{ required: true, message: 'Este campo es requerido' }]}
        >
          <SelectPaymentStatus />
        </Form.Item>
      );

    case 'selectPrices':
      // Selector de precios y opciones de pago
      return (
        <Form.Item
          label="Opciones de Pago:"
          name="payment_type_id"
          rules={[{ required: true, message: 'Este campo es requerido' }]}
        >
          <SelectPrices hidePriceInput={rest.hidePriceInput} {...rest} />
        </Form.Item>
      );

    case 'manualPayment':
      // Campo para ingreso manual de monto de pago
      return (
        <Form.Item
          name={rest.name}
          label="Monto"
          rules={[{ required: true, message: 'El monto es requerido' }]}
        >
          <Input
            value={rest.value}
            onChange={(e) =>
              rest.form.setFieldsValue({ [rest.name]: e.target.value })
            }
            prefix="S/"
            placeholder="S/ 0.00"
          />
        </Form.Item>
      );

    case 'paymentMethod':
      // Selector de método de pago
      return (
        <Form.Item
          name={rest.name}
          label="Método de Pago"
          rules={[
            { required: true, message: 'El método de pago es requerido' },
          ]}
        >
          <SelectPaymentStatus
            value={rest.value}
            onChange={(value) =>
              rest.form.setFieldsValue({ [rest.name]: value })
            }
            placeholder="Selecciona método de pago"
          />
        </Form.Item>
      );

    // ============================================================================
    // CAMPOS DE TEXTO Y EMAIL
    // ============================================================================
    
    case 'email':
      // Campo de correo electrónico con validación automática
      inputComponent = (
        <Input
          {...inputProps}
          type="email"
          onChange={(e) => {
            const value = e.target.value;
            if (rest.onChange) rest.onChange(value);
          }}
        />
      );
      break;

    case 'text':
      // Campo de texto con conversión automática a mayúsculas
      if (rest.name === 'payment' && rest.hidePaymentInput) {
        // Campo oculto para pagos cuando no se debe mostrar
        return <input type="hidden" name="payment" value={rest.value || ''} />;
      }
      inputComponent = (
        <Input
          {...inputProps}
          onChange={(e) => {
            const value = e.target.value.toUpperCase();
            if (rest.onChange) rest.onChange(value);
            if (form && rest.name) {
              form.setFieldValue(rest.name, value);
            }
          }}
        />
      );
      break;

    // ============================================================================
    // CAMPOS DE SELECCIÓN CON TEMA PERSONALIZADO
    // ============================================================================
    
    case 'select':
      // Selector genérico con tema oscuro personalizado
      return (
        <ConfigProvider
          theme={{
            components: {
              Select: {
                colorPrimary: '#1677ff',
                optionSelectedBg: '#333333',
                colorText: '#fff',
                colorBgElevated: '#444444',
                colorTextPlaceholder: '#aaa',
                controlItemBgHover: '#444444',
                selectorBg: '#444444',
              },
            },
            token: {
              colorTextBase: '#fff',
            },
          }}
        >
          <Select
            className={styles.inputStyle}
            dropdownStyle={{ backgroundColor: '#444444', color: '#fff' }}
            style={{ color: '#fff', backgroundColor: '#1a1a1a' }}
            {...rest}
          >
            {options.map((opt) => (
              <Option
                key={opt.value}
                value={opt.value}
                style={{ color: '#fff' }}
              >
                {opt.label}
              </Option>
            ))}
          </Select>
        </ConfigProvider>
      );

    // ============================================================================
    // CAMPOS DE FECHA Y HORA
    // ============================================================================
    
    case 'date':
      // Selector de fecha con tema oscuro personalizado
      inputComponent = (
        <ConfigProvider
          theme={{
            components: {
              DatePicker: {
                colorBgElevated: '#3B3B3BFF',
                colorText: '#ffffff',
                colorTextHeading: '#ffffff',
                colorIcon: '#ffffff',
                colorPrimary: '#1cb54a',
                colorPrimaryHover: '#148235',
                cellHoverBg: '#333333',
              },
            },
          }}
        >
          <DatePicker
            {...inputProps}
            style={{
              width: '100%',
              color: '#ffffff',
              backgroundColor: '#424242FF',
              borderColor: '#444444',
            }}
            dropdownStyle={{
              backgroundColor: '#000000',
              color: '#ffffff',
            }}
          />
        </ConfigProvider>
      );
      break;

    // ============================================================================
    // COMPONENTES ESPECIALIZADOS PARA CITAS
    // ============================================================================
    
    case 'cita':
      // Componente especializado para gestión de citas
      return <CitaComponents {...rest} />;

    // ============================================================================
    // CAMPOS OCULTOS
    // ============================================================================
    
    case 'hidden':
      // Campo oculto para valores que no deben mostrarse al usuario
      return <input type="hidden" name={rest.name} value={rest.value || ''} />;

    // ============================================================================
    // CASO POR DEFECTO
    // ============================================================================
    
    default:
      // Campo de entrada genérico cuando no se especifica tipo
      inputComponent = <Input {...inputProps} />;
      break;
  }

  // ============================================================================
  // MANEJO ESPECIAL PARA CAMPOS DE TELÉFONO
  // ============================================================================
  
  if (isPhoneField) {
    // Campo de teléfono con icono para alternar requerimiento
    const phoneInput = (
      <Input
        {...inputProps}
        onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
        onChange={(e) => {
          const cleanValue = e.target.value.replace(/\D/g, '');
          e.target.value = cleanValue;
          if (rest.onChange) rest.onChange(cleanValue);
        }}
        maxLength={9}
      />
    );

    return (
      <div className={styles.inputWrapper}>
        {phoneInput}
        <CheckCircleFilled
          onClick={togglePhoneRequired}
          title={
            isPhoneRequired
              ? 'Teléfono obligatorio (clic para hacerlo opcional)'
              : 'Teléfono opcional (clic para hacerlo obligatorio)'
          }
          className={styles.icon}
          style={{ color: isPhoneRequired ? '#FFF' : '#aaa' }}
        />
      </div>
    );
  }

  return inputComponent;
};

// ============================================================================
// COMPONENTES ESPECIALIZADOS PARA CITAS
// ============================================================================

/**
 * Componente que maneja diferentes tipos de campos específicos para citas
 * 
 * @param {string} componentType - Tipo de componente de cita a renderizar
 * @param {object} form - Instancia del formulario
 * @param {object} props - Propiedades adicionales
 * @returns {JSX.Element} Componente de cita renderizado
 */
const CitaComponents = ({ componentType, form, ...props }) => {
  switch (componentType) {
    case 'dateField':
      return <DateField form={form} />;
    case 'patientField':
      return <PatientField form={form} {...props} />;
    case 'timeField':
      return <TimeField form={form} />;
    case 'hourCheckbox':
      return <HourCheckbox {...props} />;
    case 'paymentCheckbox':
      return <PaymentCheckbox {...props} />;
    case 'paymentMethodField':
      // Renderiza el componente personalizado pasado por props
      const PaymentComponent = props.component;
      return (
        <Form.Item
          label="Método de Pago"
          name="payment_method_id"
          rules={[{ required: true, message: 'Este campo es requerido' }]}
        >
          <PaymentComponent />
        </Form.Item>
      );
    case 'spacer':
      // Espacio visual en blanco para mejorar el layout
      return <div style={{ height: props.height || 32 }} />;
    default:
      return null;
  }
};

// ============================================================================
// COMPONENTES INDIVIDUALES PARA CITAS
// ============================================================================

/**
 * Campo de selección de paciente con opciones para crear nuevo o elegir existente
 * 
 * @param {object} form - Instancia del formulario
 * @param {string} patientType - Tipo de paciente ('nuevo' o 'existente')
 * @param {function} onPatientTypeChange - Función para cambiar tipo de paciente
 * @param {array} patientTypeOptions - Opciones disponibles para tipo de paciente
 * @param {function} onOpenCreateModal - Función para abrir modal de creación
 * @param {object} selectedPatient - Paciente seleccionado
 * @param {function} changeSelectedPatient - Función para cambiar paciente
 * @param {function} onOpenSelectModal - Función para abrir modal de selección
 * @returns {JSX.Element} Campo de paciente renderizado
 */
const PatientField = ({
  form,
  patientType,
  onPatientTypeChange,
  patientTypeOptions,
  onOpenCreateModal,
  selectedPatient,
  changeSelectedPatient,
  onOpenSelectModal,
}) => {
  const formInstance = form || Form.useFormInstance();

  return (
    <div className={styles.patientRow}>
      <div className={styles.patientContainer}>
        {/* Contenedor del campo de entrada del paciente */}
        <div className={styles.patientInputContainer}>
          <Form.Item
            label="Paciente"
            rules={[{ required: true, message: 'Este campo es requerido' }]}
            className={styles.formItem}
            style={{ marginBottom: '-30px', marginTop: '-10px' }}
          >
            <InputField
              readonly={true}
              type="text"
              value={
                selectedPatient?.concatenatedName ||
                selectedPatient?.full_name ||
                ''
              }
              onChange={(e) => changeSelectedPatient(e.target.value)}
            />
          </Form.Item>
          {/* Campo oculto para el ID del paciente */}
          <Form.Item name="patient_id" hidden>
            <Input />
          </Form.Item>
        </div>

        {/* Contenedor del botón de acción */}
        <div className={styles.patientButtonContainer}>
          <Button
            type="primary"
            className={styles.patientButton}
            onClick={() => {
              if (patientType === 'nuevo') {
                onOpenCreateModal();
              } else {
                onOpenSelectModal();
              }
            }}
          >
            {patientType === 'nuevo' ? 'Crear' : 'Elegir'}
          </Button>
        </div>

        {/* Contenedor de checkboxes para tipo de paciente */}
        <div className={styles.checkboxColumn}>
          {patientTypeOptions.map((option) => (
            <Checkbox
              key={option.value}
              checked={patientType === option.value}
              onChange={() => onPatientTypeChange(option.value)}
              className={`${styles.checkbox} ${styles.checkboxItem}`}
            >
              {option.label}
            </Checkbox>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Campo de selección de fecha para citas
 * 
 * @param {object} form - Instancia del formulario
 * @returns {JSX.Element} Campo de fecha renderizado
 */
const DateField = ({ form }) => {
  const formInstance = form || Form.useFormInstance();

  // Manejador de cambio de fecha
  const handleDateChange = (date, dateString) => {
    console.log('Fecha seleccionada:', dateString);
    formInstance.setFieldsValue({
      appointment_date: dateString,
    });
  };

  return (
    <Form.Item
      label="Fecha de cita"
      name="appointment_date"
      rules={[{ required: true, message: 'Este campo es requerido' }]}
      className={styles.formItem}
    >
      <ConfigProvider
        theme={{
          components: {
            DatePicker: {
              colorBgElevated: '#222222FF',
              colorText: '#ffffff',
              colorTextHeading: '#ffffff',
              colorIcon: '#ffffff',
              colorPrimary: '#1cb54a',
              colorPrimaryHover: '#148235',
              cellHoverBg: '#333333',
            },
          },
        }}
      >
        <DatePicker
          style={{
            width: '100%',
            color: '#ffffff',
            backgroundColor: '#333333FF',
            borderColor: '#444444',
          }}
          onChange={handleDateChange}
          dropdownStyle={{
            backgroundColor: '#2C2C2CFF',
            color: '#ffffff',
          }}
        />
      </ConfigProvider>
    </Form.Item>
  );
};

/**
 * Campo de selección de hora para citas
 * 
 * @param {object} form - Instancia del formulario
 * @returns {JSX.Element} Campo de hora renderizado
 */
const TimeField = ({ form }) => {
  const formInstance = form || Form.useFormInstance();

  // Manejador de cambio de hora
  const handleTimeChange = (time, timeString) => {
    formInstance.setFieldsValue({
      appointment_hour: timeString,
    });
  };

  return (
    <Form.Item
      label="Hora de cita"
      name="appointment_hour"
      rules={[{ required: true, message: 'Este campo es requerido' }]}
      className={styles.formItem}
    >
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          components: {
            TimePicker: {
              colorTextPlaceholder: '#AAAAAA',
              colorBgContainer: '#333333',
              colorText: '#FFFFFF',
              colorBorder: '#444444',
              hoverBorderColor: '#555555',
              activeBorderColor: '#00AA55',
              colorIcon: '#FFFFFF',
              colorIconHover: '#00AA55',
              colorBgElevated: '#121212',
              colorPrimary: '#00AA55',
              colorTextDisabled: '#333333',
              colorTextHeading: '#FFFFFF',
            },
          },
        }}
      >
        <TimePicker
          format="HH:mm"
          style={{ width: '100%' }}
          onChange={handleTimeChange}
        />
      </ConfigProvider>
    </Form.Item>
  );
};

/**
 * Checkbox para mostrar/ocultar campo de hora
 * 
 * @param {boolean} showHourField - Indica si se debe mostrar el campo de hora
 * @param {function} onShowHourFieldChange - Función para cambiar visibilidad
 * @returns {JSX.Element} Checkbox renderizado
 */
const HourCheckbox = ({ showHourField, onShowHourFieldChange }) => (
  <Checkbox
    checked={showHourField}
    onChange={onShowHourFieldChange}
    className={styles.checkbox}
  >
    Hora cita
  </Checkbox>
);

/**
 * Checkbox para indicar si la cita requiere pago
 * 
 * @param {boolean} isPaymentRequired - Indica si el pago es requerido
 * @param {function} onPaymentRequiredChange - Función para cambiar requerimiento
 * @returns {JSX.Element} Checkbox renderizado
 */
const PaymentCheckbox = ({ isPaymentRequired, onPaymentRequiredChange }) => (
  <Checkbox
    checked={!isPaymentRequired}
    onChange={(e) => onPaymentRequiredChange(e)}
    className={styles.checkbox}
  >
    Cita
  </Checkbox>
);

// ============================================================================
// EXPORTACIÓN DEL COMPONENTE PRINCIPAL
// ============================================================================

export default InputField;

// Importación de componentes de Ant Design y React
import { Button, Col, ConfigProvider, Form, Row } from 'antd';
import { useState, forwardRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

// Importación de estilos CSS y componente personalizado de entrada
import styles from '../Form/Form.module.css';
import '../Form/Form.enhanced.css';
import InputField from '../Input/Input';

// Hook de formulario de Ant Design
const { useForm } = Form;

// Componente principal del formulario, usando forwardRef para permitir referencias externas
const FormComponent = forwardRef(
  (
    {
      // Props configurables para personalizar el formulario
      fields = [], // Lista de campos a renderizar
      mode = 'create', // Modo del formulario ('create' o 'edit')
      showHourField = false, // Mostrar campo de hora
      isPaymentRequired = true, // Requiere pago
      patientType = '', // Tipo de paciente
      paymentOption = '', // Opción de pago seleccionada
      customAmount = '', // Monto personalizado
      onSubmit = () => {}, // Callback al enviar el formulario
      onPaymentOptionChange = () => {}, // Callback al cambiar opción de pago
      onPatientTypeChange = () => {}, // Callback al cambiar tipo de paciente
      onShowHourFieldChange = () => {}, // Callback al mostrar/ocultar campo de hora
      onPaymentRequiredChange = () => {}, // Callback al cambiar si el pago es requerido
      onOpenCreateModal = () => {}, // Callback para abrir modal de creación
      onOpenSelectModal = () => {}, // Callback para abrir modal de selección
      onCancel = () => {}, // Callback al cancelar el formulario
      form: externalForm, // Formulario externo opcional
      onPriceChange, // Callback para cambios de precio
    },
    ref, // Referencia externa al formulario
  ) => {
    // Hook para manejar el formulario interno si no se pasa uno externo
    const [internalForm] = useForm();
    const form = externalForm || internalForm;

    // Estados locales
    const [loading, setLoading] = useState(false); // Estado de carga para el botón
    const [isPhoneRequired, setIsPhoneRequired] = useState(true); // Si el teléfono es obligatorio
    const [selectedPatient, setSelectedPatient] = useState('XD'); // Paciente seleccionado

    // Alterna si el campo de teléfono es obligatorio
    const togglePhoneRequired = () => {
      setIsPhoneRequired((prev) => !prev);
      form.validateFields(['primary_phone']); // Revalida el campo de teléfono
    };

    // Actualiza el paciente seleccionado
    const handleSelectedPatientChange = (newText) => {
      setSelectedPatient(newText);
    };

    // Renderiza cada campo del formulario según su tipo
    const renderField = (field, index) => {
      // Renderiza un título
      if (field.type === 'title') {
        return (
          <Col span={24} key={index}>
            <h2 className={styles.title}>{field.label}</h2>
          </Col>
        );
      }

      // Renderiza una fila personalizada con subcampos
      if (field.type === 'customRow') {
        return (
          <Col span={24} key={index}>
            <Row gutter={[25, 0]}>
              {field.fields.map((subField, subIndex) =>
                renderField(subField, `${index}-${subIndex}`),
              )}
            </Row>
          </Col>
        );
      }

      // Renderiza un componente personalizado (InputField con props extendidas)
      if (field.type === 'customComponent') {
        // Condicional para mostrar el campo de hora
        if (field.show === 'showHourField' && !showHourField) return null;

        return (
          <Col span={field.span || 24} key={index}>
            <InputField
              selectedPatient={selectedPatient}
              changeSelectedPatient={handleSelectedPatientChange}
              type="cita"
              componentType={field.componentType}
              form={form}
              {...field.props}
              showHourField={showHourField}
              isPaymentRequired={isPaymentRequired}
              patientType={patientType}
              paymentOption={paymentOption}
              customAmount={customAmount}
              paymentOptions={field.props?.paymentOptions}
              onPatientTypeChange={onPatientTypeChange}
              onPaymentOptionChange={onPaymentOptionChange}
              onShowHourFieldChange={onShowHourFieldChange}
              onPaymentRequiredChange={onPaymentRequiredChange}
              onOpenCreateModal={onOpenCreateModal}
              onOpenSelectModal={onOpenSelectModal}
              onPriceChange={onPriceChange}
            />
          </Col>
        );
      }

      // Renderiza campos estándar (ej. texto, teléfono)
      const isPhoneField = field.name === 'primary_phone';
      return (
        <Col span={field.span || 8} key={index}>
          <Form.Item
            name={field.name}
            label={<span className={styles.label}>{field.label}</span>}
            className={`${styles.formItem} ${field.className || ''}`}
            rules={
              isPhoneField
                ? [
                    ...(isPhoneRequired
                      ? [
                          {
                            required: true,
                            message: 'Por favor ingrese su teléfono',
                          },
                        ]
                      : []),
                    () => ({
                      validator(_, value) {
                        if (!value || (value && value.length === 9)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('El teléfono debe tener 9 dígitos'),
                        );
                      },
                    }),
                  ]
                : field.rules
            }
          >
            <InputField
              type={isPhoneField ? 'phoneNumber' : field.type}
              selectedPatient={selectedPatient}
              label={field.label}
              options={field.options || []}
              isPhoneField={isPhoneField}
              isPhoneRequired={isPhoneRequired}
              togglePhoneRequired={togglePhoneRequired}
              onPriceChange={onPriceChange}
            />
          </Form.Item>
        </Col>
      );
    };

    // Obtener el tema actual
    const { theme } = useTheme();
    
    // Configuración del tema para el formulario
    const formTheme = {
      token: {
        colorPrimary: '#4caf50',
        colorBgContainer: theme === 'dark' ? '#161b22' : '#ffffff',
        colorText: theme === 'dark' ? '#f0f6fc' : '#212529',
        colorBorder: theme === 'dark' ? '#30363d' : '#dee2e6',
        colorBorderSecondary: theme === 'dark' ? '#30363d' : '#e8f5e8',
        controlOutline: 'none',
        fontFamily: 'sans-serif',
      },
      components: {
        Form: {
          labelColor: theme === 'dark' ? '#f0f6fc' : '#2d5a2d',
          colorTextHeading: theme === 'dark' ? '#f0f6fc' : '#2d5a2d',
        },
        Input: {
          colorBgContainer: theme === 'dark' ? '#21262d' : '#ffffff',
          colorText: theme === 'dark' ? '#f0f6fc' : '#212529',
          colorBorder: theme === 'dark' ? '#30363d' : '#dee2e6',
          colorTextPlaceholder: theme === 'dark' ? '#8b949e' : '#6c757d',
        },
        Select: {
          colorBgContainer: theme === 'dark' ? '#21262d' : '#ffffff',
          colorText: theme === 'dark' ? '#f0f6fc' : '#212529',
          colorBorder: theme === 'dark' ? '#30363d' : '#dee2e6',
          colorTextPlaceholder: theme === 'dark' ? '#8b949e' : '#6c757d',
        },
        Button: {
          colorPrimary: '#4caf50',
          colorPrimaryHover: '#3d8b40',
          colorPrimaryActive: '#2d6a30',
        },
      },
    };
    
    // Render principal del formulario
    return (
      <ConfigProvider theme={formTheme}>
        <div className={styles.container}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onSubmit}
            className={styles.formContainer}
            ref={ref}
          >
            {/* Renderiza todos los campos definidos */}
            <Row gutter={[20, 0]}>
              {fields.map((field, index) => renderField(field, index))}
            </Row>

            {/* Botones de acción */}
            <Form.Item className={styles.buttonGroup}>
              <div className={styles.buttonWrapper}>
                <Button
                  htmlType="button"
                  className={styles.buttonCancel}
                  onClick={onCancel}
                >
                  Cancelar
                </Button>
                <Button
                  type="primary"
                  className={styles.buttonSubmit}
                  loading={loading}
                  onClick={() => form.submit()}
                >
                  {mode === 'edit' ? 'Actualizar' : 'Registrar'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </ConfigProvider>
    );
  },
);

// Exporta el componente para su uso en otros módulos
export default FormComponent;
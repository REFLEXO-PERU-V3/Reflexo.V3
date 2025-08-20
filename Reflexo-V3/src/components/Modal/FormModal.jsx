import { Form, Input, ConfigProvider } from 'antd';
import CustomModal from './CustomModal';
import { useState } from 'react';

/**
 * Modal con formulario reutilizable
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Estado que controla si el modal está abierto o cerrado
 * @param {function} props.onClose - Función para cerrar el modal
 * @param {string} props.title - Título del modal
 * @param {function} props.onSubmit - Función a ejecutar al enviar el formulario
 * @param {Object} props.initialValues - Valores iniciales del formulario
 * @param {Array} props.fields - Campos del formulario
 */
const FormModal = ({
  isOpen,
  onClose,
  title = 'Formulario',
  onSubmit,
  initialValues = {},
  fields = [
    { name: 'name', label: 'Nombre', rules: [{ required: true, message: 'Por favor ingrese un nombre' }] },
    { name: 'email', label: 'Email', rules: [{ required: true, message: 'Por favor ingrese un email' }] },
  ],
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Error en el formulario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleCancel}
      title={title}
      onOk={handleSubmit}
      okText="Guardar"
      cancelText="Cancelar"
      confirmLoading={loading}
    >
      <ConfigProvider
        theme={{
          components: {
            Form: {
              colorText: '#333333',
              colorTextLabel: '#333333',
              colorBgContainer: '#ffffff',
              colorBorder: '#d9d9d9',
              colorPrimary: '#00AA55',
            },
            Input: {
              colorText: '#333333',
              colorTextPlaceholder: '#aaaaaa',
              colorBgContainer: '#ffffff',
              colorBorder: '#d9d9d9',
              activeBorderColor: '#00AA55',
            },
          },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          style={{ maxHeight: '60vh', overflowY: 'auto' }}
        >
          {fields.map((field) => (
            <Form.Item
              key={field.name}
              name={field.name}
              label={field.label}
              rules={field.rules}
            >
              <Input placeholder={`Ingrese ${field.label.toLowerCase()}`} />
            </Form.Item>
          ))}
        </Form>
      </ConfigProvider>
    </CustomModal>
  );
};

export default FormModal;
import React, { useState } from 'react';
import { Button, Form, Input, Space } from 'antd';

// Componente stub temporal para resolver el import desde EditAppointment
// Reemplázalo con tu implementación real cuando esté lista.
const NewPatient = ({ onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleFinish = async (values) => {
    try {
      setSubmitting(true);
      // Simula creación y retorna un objeto compatible con el flujo de EditAppointment
      const result = {
        id: Date.now(),
        name: values.name || 'Nombre',
        paternal_lastname: values.paternal_lastname || 'Apellido Paterno',
        maternal_lastname: values.maternal_lastname || 'Apellido Materno',
      };
      onSubmit?.(result);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Ingrese el nombre' }]}>
          <Input placeholder="Nombre" />
        </Form.Item>
        <Form.Item label="Apellido Paterno" name="paternal_lastname">
          <Input placeholder="Apellido paterno" />
        </Form.Item>
        <Form.Item label="Apellido Materno" name="maternal_lastname">
          <Input placeholder="Apellido materno" />
        </Form.Item>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onCancel}>Cancelar</Button>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Guardar
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default NewPatient;

import React, { useState, useEffect } from 'react';
import ModeloTable from '../../../components/Table/Tabla';
import styles from './Payments.module.css';
import { usePaymentTypes, usePrices } from './paymentsHook';
import {
  Button,
  Space,
  Form,
  Input,
  message,
  ConfigProvider,
  Popconfirm,
} from 'antd';
import BaseModal from '../../../components/Modal/BaseModalPayments/BaseModalPayments';
import { useTheme } from '../../../context/ThemeContext';

// Constantes para tipos de modal
const MODAL_TYPES = {
  PAYMENT: 'payment',
  PRICE: 'price'
};

// Constantes para acciones
const ACTIONS = {
  CREATE: 'create',
  EDIT: 'edit'
};

// Constantes para estados
const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ENABLED: 'Habilitado'
};

// Función para renderizar el estado
const renderStatus = (status) => {
  if (status === STATUS.ENABLED) {
    return <span className={styles.statusEnabled}>{status}</span>;
  }
  return <span className={styles.statusDisabled}>{status}</span>;
};

// Función helper para obtener el tipo de modal basado en el registro
const getModalType = (record) => record.price !== undefined ? MODAL_TYPES.PRICE : MODAL_TYPES.PAYMENT;

// Función helper para obtener el nombre del tipo
const getTypeName = (type) => type === MODAL_TYPES.PAYMENT ? 'tipo de pago' : 'precio';

// Función helper para obtener el título del modal
const getModalTitle = (action, type) => {
  const typeName = getTypeName(type);
  return action === ACTIONS.CREATE ? `Agregar nuevo ${typeName}` : `Editar ${typeName}`;
};

// Función helper para obtener el texto del botón OK
const getOkText = (action) => action === ACTIONS.CREATE ? 'Crear' : 'Actualizar';

// Función helper para obtener el label del campo nombre
const getNameLabel = (type) => `Nombre del ${getTypeName(type)}`;

// Función helper para obtener el placeholder del campo nombre
const getNamePlaceholder = (type) => `Ingrese el nombre del ${getTypeName(type)}`;

const Payments = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';  
  const {
    paymentTypes,
    loading: loadingPayments,
    addPaymentType,
    editPaymentType,
    removePaymentType,
    refreshPaymentTypes,
  } = usePaymentTypes();

  const {
    prices,
    loading: loadingPrices,
    addPrice,
    editPrice,
    removePrice,
    refreshPrices,
  } = usePrices();

  const [modalOpen, setModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [modalType, setModalType] = useState('');
  const [action, setAction] = useState('');

  // Función helper para preparar valores iniciales del formulario
  const getInitialValues = () => {
    if (action === ACTIONS.EDIT && currentRecord) {
      const formData = {
        name: currentRecord.name,
        status: currentRecord.status === STATUS.ENABLED,
      };

      // Si es un precio, agregar el campo price
      if (modalType === MODAL_TYPES.PRICE && currentRecord.price) {
        formData.price = parseFloat(currentRecord.price);
      }

      return formData;
    }

    // Valores por defecto para crear
    return {
      name: '',
      status: true,
      ...(modalType === MODAL_TYPES.PRICE && { price: '' }),
    };
  };

  // Función helper para abrir el modal
  const openModal = (newAction, newModalType, record = null) => {
    setAction(newAction);
    setModalType(newModalType);
    setCurrentRecord(record);
    setModalOpen(true);
  };

  // Función helper para manejar acciones del modal
  const handleAction = (action, record) => {
    const modalType = getModalType(record);
    openModal(action, modalType, record);
  };

  // Función helper para crear nuevos registros
  const handleCreate = (type) => {
    openModal(ACTIONS.CREATE, type);
  };

  // Función helper para procesar el envío del formulario
  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        name: values.name?.toUpperCase().trim(),
        status: values.status ? STATUS.ACTIVE : STATUS.INACTIVE,
      };

      if (modalType === MODAL_TYPES.PAYMENT) {
        if (action === ACTIONS.CREATE) {
          await addPaymentType({ name: payload.name, status: payload.status });
        } else {
          await editPaymentType(currentRecord.id, {
            name: payload.name,
            status: payload.status,
          });
        }
        refreshPaymentTypes();
      } else {
        if (action === ACTIONS.CREATE) {
          await addPrice({
            name: payload.name,
            price: payload.price,
            status: payload.status,
          });
        } else {
          await editPrice(currentRecord.id, {
            name: payload.name,
            price: payload.price,
            status: payload.status,
          });
        }
        refreshPrices();
      }

      message.success(
        action === ACTIONS.CREATE
          ? 'Registro creado exitosamente'
          : 'Registro actualizado exitosamente',
      );
      handleModalCancel();
    } catch (error) {
      message.error('Ocurrió un error al procesar la solicitud');
      console.error(error);
    }
  };

  // Función helper para desactivar registros
  const handleDeactivate = async (record) => {
    try {
      if (record.price !== undefined) {
        await removePrice(record.id);
        refreshPrices();
        message.success('Precio desactivado exitosamente');
      } else {
        await removePaymentType(record.id);
        refreshPaymentTypes();
        message.success('Tipo de pago desactivado exitosamente');
      }
    } catch (error) {
      message.error('Ocurrió un error al desactivar el registro');
      console.error(error);
    }
  };

  // Función helper para activar registros
  const handleActivate = async (record, type) => {
    try {
      if (type === MODAL_TYPES.PAYMENT) {
        await addPaymentType({ name: record.name, status: STATUS.ACTIVE });
        refreshPaymentTypes();
        message.success('Tipo de pago activado correctamente');
      } else {
        await addPrice({
          name: record.name,
          price: record.price,
          status: STATUS.ACTIVE,
        });
        refreshPrices();
        message.success('Precio activado correctamente');
      }
    } catch (error) {
      message.error('Ocurrió un error al activar el registro');
      console.error(error);
    }
  };

  // Función helper para cancelar el modal
  const handleModalCancel = () => {
    setModalOpen(false);
    setCurrentRecord(null);
    setAction('');
    setModalType('');
  };



  // Columnas para tipos de pago
  const paymentTypeColumns = [
    {
      title: 'Tipo de pago',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: renderStatus,
    },
    {
      title: 'Acciones',
      key: 'actions',
      align: 'center',
      render: (_, record) => renderActionButtons(record, MODAL_TYPES.PAYMENT),
    },
  ];

  // Columnas para precios
  const priceColumns = [
    {
      title: 'Tipo',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Costo',
      dataIndex: 'formattedPrice',
      key: 'price',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: renderStatus,
    },
    {
      title: 'Acciones',
      key: 'actions',
      align: 'center',
      render: (_, record) => renderActionButtons(record, MODAL_TYPES.PRICE),
    },
  ];

  // Función helper para renderizar secciones de tabla
  const renderTableSection = (title, columns, data, loading, onCreate) => (
    <div>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <Button
          type="primary"
          size="small"
          className={styles.addButton}
          onClick={onCreate}
        >
          Agregar
        </Button>
      </div>
      <ModeloTable
        columns={columns}
        data={data}
        loading={loading}
        pagination={false}
      />
    </div>
  );

  // Función helper para renderizar el campo de nombre
  const renderNameField = () => (
    <Form.Item
      name="name"
      label={getNameLabel(modalType)}
      rules={[{ required: true, message: 'Este campo es requerido' }]}
    >
      <Input
        size="large"
        className={styles.inputField}
        placeholder={getNamePlaceholder(modalType)}
        onChange={(e) => {
          const value = e.target.value.toUpperCase();
          e.target.value = value;
        }}
      />
    </Form.Item>
  );

  // Función helper para renderizar el campo de precio
  const renderPriceField = () => (
    modalType === MODAL_TYPES.PRICE && (
      <Form.Item
        name="price"
        label="Costo"
        rules={[
          { required: true, message: 'Este campo es requerido' },
          {
            pattern: /^\d+(\.\d{1,2})?$/,
            message: 'Ingrese un valor válido (ej: 10.50)',
          },
        ]}
      >
        <Input
          prefix="S/"
          type="number"
          step="0.01"
          size="large"
          className={styles.inputField}
          placeholder="0.00"
        />
      </Form.Item>
    )
  );

  // Función helper para renderizar botones de acción
  const renderActionButtons = (record, type) => (
    <Space size={4}>
      <Button
        size="small"
        className={`${styles.actionButton} ${styles.editActionButton}`}
        onClick={() => handleAction(ACTIONS.EDIT, record)}
      >
        Editar
      </Button>
      {record.status === STATUS.ENABLED ? (
        <Popconfirm
          title="¿Estás seguro de que quieres desactivar este registro?"
          onConfirm={() => handleDeactivate(record)}
          okText="Sí"
          cancelText="No"
        >
          <Button 
            size="small" 
            className={`${styles.actionButton} ${styles.deactivateActionButton}`}
          >
            Desactivar
          </Button>
        </Popconfirm>
      ) : (
                 <Button
           size="small"
           className={`${styles.actionButton} ${styles.restoreActionButton}`}
           onClick={() => handleActivate(record, type)}
         >
           Restaurar
         </Button>
      )}
    </Space>
  );

  // Configuración del tema dinámico
  const getThemeConfig = () => {
    const isDark = theme === 'dark';
    return {
      token: {
        colorPrimary: '#52c41a',
        colorSuccess: '#52c41a',
        colorWarning: '#faad14',
        colorError: '#ff4d4f',
        borderRadius: 8,
        colorBgContainer: isDark ? '#2a2a2a' : '#FFFFFF',
        colorText: isDark ? '#ffffff' : '#333333',
        colorTextLightSolid: '#ffffff',
        colorBgLayout: isDark ? '#1a1a1a' : '#f5f5f5',
        colorBgElevated: isDark ? '#1e1e1e' : '#ffffff',
        colorBorder: isDark ? '#555555' : '#d9d9d9',
      },
      components: {
        Button: {
          primaryShadow: 'none',
          controlHeight: 32,
          controlHeightSM: 28,
          borderRadius: 8,
          borderRadiusSM: 6,
          colorPrimary: '#52c41a',
          colorBgContainer: isDark ? '#333333' : '#ffffff',
          colorText: isDark ? '#ffffff' : '#333333',
          colorBorder: isDark ? '#555555' : '#d9d9d9',
        },
        Table: {
          headerBg: isDark ? '#1e1e1e' : '#FAFAFA',
          headerColor: isDark ? '#ffffff' : '#333333',
          colorBgContainer: isDark ? '#2a2a2a' : '#ffffff',
          colorText: isDark ? '#ffffff' : '#333333',
          colorBorder: isDark ? '#555555' : '#d9d9d9',
          borderRadius: 8,
          headerBorderRadius: 8,
        },
        Popconfirm: {
          borderRadius: 8,
          padding: 12,
          colorBgElevated: isDark ? '#1e1e1e' : '#ffffff',
          colorText: isDark ? '#ffffff' : '#333333',
        },
        Popover: {
          colorBgElevated: isDark ? '#1e1e1e' : '#ffffff',
          colorText: isDark ? '#ffffff' : '#333333',
        },
        Modal: {
          colorBgElevated: isDark ? '#2a2a2a' : '#ffffff',
          colorText: isDark ? '#ffffff' : '#333333',
          borderRadius: 12,
        },
      },
    };
  };

  return (
    <ConfigProvider theme={getThemeConfig()}>
      <div className={styles.container} data-theme={theme}>
        {/* Tipos de Pago */}
        {renderTableSection(
          'Tipos de pago',
          paymentTypeColumns,
          paymentTypes,
          loadingPayments,
          () => handleCreate(MODAL_TYPES.PAYMENT)
        )}

        {/* Precios */}
        {renderTableSection(
          'Precios',
          priceColumns,
          prices,
          loadingPrices,
          () => handleCreate(MODAL_TYPES.PRICE)
        )}

        {/* Modal con BaseModal */}
        <BaseModal
          open={modalOpen}
          onCancel={handleModalCancel}
          onOk={handleSubmit}
          title={getModalTitle(action, modalType)}
          okText={getOkText(action)}
          cancelText="Cancelar"
          width={500}
          initialValues={getInitialValues()}
        >
          {renderNameField()}
          {renderPriceField()}
        </BaseModal>
      </div>
    </ConfigProvider>
  );
};

export default Payments;

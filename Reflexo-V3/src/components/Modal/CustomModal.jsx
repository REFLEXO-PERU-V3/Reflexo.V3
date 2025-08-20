import { Modal, ConfigProvider } from 'antd';
import { useState } from 'react';

/**
 * Componente de modal personalizado usando Ant Design
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Estado que controla si el modal está abierto o cerrado
 * @param {function} props.onClose - Función para cerrar el modal
 * @param {string} props.title - Título del modal
 * @param {React.ReactNode} props.children - Contenido del modal
 * @param {string} props.width - Ancho del modal (por defecto '500px')
 * @param {boolean} props.centered - Si el modal debe estar centrado verticalmente
 * @param {function} props.onOk - Función para el botón de confirmación
 * @param {string} props.okText - Texto del botón de confirmación
 * @param {string} props.cancelText - Texto del botón de cancelación
 * @param {boolean} props.closable - Si el modal puede cerrarse con el botón X
 */
const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  width = '500px',
  centered = true,
  onOk,
  okText = 'Aceptar',
  cancelText = 'Cancelar',
  closable = true,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            colorBgMask: 'rgba(0, 0, 0, 0.45)',
            colorBgElevated: '#ffffff', // Fondo del modal blanco
            colorText: '#333333', // Texto oscuro para contraste con fondo blanco
            colorIcon: '#333333', // Iconos oscuros
            colorIconHover: '#00AA55', // Color primario al hacer hover
            colorPrimary: '#00AA55', // Color primario para botones
            borderRadiusLG: 8, // Radio de borde
            paddingContentHorizontalLG: 24, // Padding horizontal
            paddingMD: 16, // Padding general
            fontSize: 14, // Tamaño de fuente
            lineHeight: 1.5715, // Altura de línea
          },
        },
      }}
    >
      <Modal
        title={title}
        open={isOpen}
        onCancel={onClose}
        width={width}
        centered={centered}
        onOk={onOk}
        okText={okText}
        cancelText={cancelText}
        closable={closable}
      >
        {children}
      </Modal>
    </ConfigProvider>
  );
};

/**
 * Hook personalizado para gestionar el estado del modal
 * @returns {Object} - Objeto con el estado y funciones para controlar el modal
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
};

export default CustomModal;
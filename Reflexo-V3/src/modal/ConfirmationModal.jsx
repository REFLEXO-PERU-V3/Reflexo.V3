import CustomModal from './CustomModal';
import CustomButton from '../components/Button/CustomButtom';

/**
 * Modal de confirmación reutilizable
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Estado que controla si el modal está abierto o cerrado
 * @param {function} props.onClose - Función para cerrar el modal
 * @param {string} props.title - Título del modal
 * @param {string} props.message - Mensaje de confirmación
 * @param {function} props.onConfirm - Función a ejecutar al confirmar
 * @param {string} props.confirmText - Texto del botón de confirmación
 */
const ConfirmationModal = ({
  isOpen,
  onClose,
  title = 'Confirmación',
  message = '¿Está seguro que desea realizar esta acción?',
  onConfirm,
  confirmText = 'Confirmar',
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      width="400px"
      footer={null}
    >
      <div style={{ marginBottom: '20px' }}>{message}</div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <CustomButton text="Cancelar" onClick={onClose} />
        <CustomButton text={confirmText} onClick={handleConfirm} />
      </div>
    </CustomModal>
  );
};

export default ConfirmationModal;
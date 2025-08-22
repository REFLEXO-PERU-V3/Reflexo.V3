import { Button, Space, notification, Spin, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router';
import CustomButton from '../../../components/Button/CustomButtom';
import CustomSearch from '../../../components/Search/CustomSearch';
import ModeloTable from '../../../components/Table/Tabla';
import { useStaff } from '../hook/staffHook';
import { useState } from 'react';
import EditTherapist from './EditTherapist/EditTherapist';
import { getTherapistById } from '../service/staffService';
import { LoadingOutlined } from '@ant-design/icons';
import InfoTherapist from './infoTherapist/infoTherapist';
import { useTheme } from '../../../context/ThemeContext';
import styles from './staff.module.css';

const whiteSpinIndicator = (
  <LoadingOutlined style={{ fontSize: 20, color: '#fff' }} spin />
);

export default function Staff() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const {
    staff,
    loading,
    searching,
    pagination,
    searchTerm,
    handlePageChange,
    setSearchTerm,
    handleSearch,
    handleDeleteTherapist,
  } = useStaff();
  const [editingTherapist, setEditingTherapist] = useState(null);
  const [loadingEditId, setLoadingEditId] = useState(null);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);
  const [therapistInfo, setTherapistInfo] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Nuevo handler para editar: hace GET antes de abrir el modal
  const handleEdit = async (record) => {
    setLoadingEditId(record.id);
    setEditingTherapist(record);
    try {
      const freshTherapist = await getTherapistById(record.id);
      setEditingTherapist(freshTherapist);
    } catch (e) {
      notification.error({
        message: 'Error',
        description: 'No se pudo obtener los datos actualizados.',
      });
    } finally {
      setLoadingEditId(null);
    }
  };

  const handleDelete = async (id) => {
    setLoadingDeleteId(id);
    try {
      await handleDeleteTherapist(id);
    } finally {
      setLoadingDeleteId(null);
    }
  };

  const handleInfo = (record) => {
    setTherapistInfo(record);
    setShowInfoModal(true);
  };

  const handleAction = (action, record) => {
    switch (action) {
      case 'edit':
        return (
          <Button
            style={{
              backgroundColor: '#0066FF',
              color: '#fff',
              border: 'none',
              minWidth: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={async () => {
              setLoadingEditId(record.id);
              setEditingTherapist(record);
              try {
                const freshTherapist = await getTherapistById(record.id);
                setEditingTherapist(freshTherapist);
              } finally {
                setLoadingEditId(null);
              }
            }}
            disabled={loadingEditId === record.id}
          >
            {loadingEditId === record.id ? (
              <Spin size="small" style={{ color: '#fff' }} />
            ) : (
              'Editar'
            )}
          </Button>
        );
      case 'info':
        return (
          <Button
            style={{
              backgroundColor: '#00AA55',
              color: '#fff',
              border: 'none',
            }}
            onClick={() => handleInfo(record)}
          >
            Más Info
          </Button>
        );
      case 'delete':
        return (
          <Button
            style={{
              backgroundColor: '#FF3333',
              color: '#fff',
              border: 'none',
              minWidth: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => handleDelete(record.id)}
            disabled={loadingDeleteId === record.id}
          >
            {loadingDeleteId === record.id ? (
              <ConfigProvider theme={{ token: { colorPrimary: '#fff' } }}>
                <Spin />
              </ConfigProvider>
            ) : (
              'Eliminar'
            )}
          </Button>
        );
      default:
        return null;
    }
  };

  const handleButton = () => {
    navigate('registrar');
  };

  const handleSearchInput = (value) => {
    handleSearch(value);
  };

  const columns = [
    {
      title: 'Nro. Documento',
      dataIndex: 'document_number',
      key: 'document_number',
      width: '150px',
    },
    {
      title: 'Apellidos y Nombres',
      dataIndex: 'full_name',
      key: 'name',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          {handleAction('edit', record)}
          {handleAction('info', record)}
          {handleAction('delete', record)}
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.staffMainContainer}>
      <div className={styles.staffContainer}>
        <div className={styles.staffHeader}>
          <div className={styles.staffHeaderLeft}>
            <CustomButton text="Crear Terapeuta" onClick={handleButton} />
          </div>

          <div className={styles.staffHeaderCenter}>
            <CustomSearch
              placeholder="Buscar por Apellido/Nombre o DNI..."
              onSearch={handleSearchInput}
              width="600px"
              loading={searching}
              showLoadingIndicator={true}
            />
          </div>

          <div className={styles.staffHeaderRight}>
            <Button
              type="button"
              onClick={toggleTheme}
              className={styles.themeToggleButton}
            >
              {theme === 'dark' ? '☀️' : '🌙'} 
              {theme === 'dark' ? 'Tema Claro' : 'Tema Oscuro'}
            </Button>
          </div>
        </div>

        {/* Indicador de resultados de búsqueda */}
        {searchTerm && (
          <div className={styles.searchResults}>
            <div className={styles.searchInfo}>
              <span className={styles.searchTerm}>
                Búsqueda: "{searchTerm}"
              </span>
              <span className={styles.resultCount}>
                {searching ? 'Buscando...' : `${staff.length} resultado${staff.length !== 1 ? 's' : ''} encontrado${staff.length !== 1 ? 's' : ''}`}
              </span>
            </div>
            {!searching && (
              <Button
                type="text"
                onClick={() => handleSearchInput('')}
                className={styles.clearSearchButton}
              >
                Limpiar búsqueda
              </Button>
            )}
          </div>
        )}

        <ModeloTable
          columns={columns}
          data={staff}
          loading={loading}
          pagination={{
            current: pagination.currentPage,
            total: pagination.totalItems,
            pageSize: 50,
            onChange: handlePageChange,
          }}
        />

        {editingTherapist && (
          <EditTherapist
            therapist={editingTherapist}
            onClose={() => setEditingTherapist(null)}
            onSave={() => handlePageChange(pagination.currentPage)}
          />
        )}

        {therapistInfo && (
          <InfoTherapist
            therapist={therapistInfo}
            open={showInfoModal}
            onClose={() => setShowInfoModal(false)}
          />
        )}
      </div>
    </div>
  );
}

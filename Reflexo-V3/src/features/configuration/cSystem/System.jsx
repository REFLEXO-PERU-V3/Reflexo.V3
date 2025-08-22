import { useState, useEffect } from 'react';
import { Upload, Input, Button, Spin, Image, message, Modal } from 'antd';
import { UploadOutlined, LoadingOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import MiniLogo from '../../../assets/Img/Dashboard/MiniLogoReflexo.png';
import styles from './System.module.css';
import { useUpdateCompanyInfo, useUploadCompanyLogo } from './hook/systemHook';
import { useCompany } from '../../../context/CompanyContext';
import { useTheme } from '../../../context/ThemeContext';
// Modo simulación sin backend
const SIMULATE = true;

const System = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [modal, modalContextHolder] = Modal.useModal();
  const { theme, toggleTheme } = useTheme();
  const {
    companyInfo,
    logoUrl,
    loading,
    refetchCompanyInfo,
    refetchCompanyLogo,
  } = useCompany();
  const { updateCompany, updating } = useUpdateCompanyInfo();
  const { uploadLogo, uploadingLogo, uploadError, uploadSuccess } =
    useUploadCompanyLogo();
  const [companyName, setCompanyName] = useState('');
  const [logoPreview, setLogoPreview] = useState(null);

  //Establecer nombre de la empresa desde el contexto
  useEffect(() => {
    if (companyInfo?.company_name) {
      setCompanyName(companyInfo.company_name);
    }
  }, [companyInfo]);

  //Sincronizar vista previa del logo con lo que viene del contexto
  useEffect(() => {
    if (logoUrl) {
      setLogoPreview(logoUrl);
    }
  }, [logoUrl]);
  const img = MiniLogo;

  // Aplicar el atributo global para tematizar la página
  useEffect(() => {
    // Cambia el tema con data-attribute para habilitar overrides CSS
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      document.body && document.body.setAttribute('data-theme', theme);
    }
  }, [theme]);

  //MOSTRAR MENSAJES DE EXITO/ERROR
  useEffect(() => {
    if (uploadSuccess) {
      messageApi.success('Logo actualizado correctamente');
    }
    if (uploadError) {
      messageApi.error(`Error al subir logo: ${uploadError.message}`);
    }
  }, [uploadSuccess, uploadError, messageApi]);

  // Confirm helper
  const confirmAction = ({ title, content, okText = 'Sí, aplicar', cancelText = 'Cancelar' }) =>
    new Promise((resolve) => {
      modal.confirm({
        title,
        content,
        okText,
        cancelText,
        onOk: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });

  //ACTUALIZA DATOS DE LA EMPRESA
  const handleNameChange = async () => {
    if (!companyName.trim()) return;
    const ok = await confirmAction({
      title: '¿Seguro que quieres aplicar estos cambios?',
      content: `Nuevo nombre: "${companyName}"`,
    });
    if (!ok) return;
    if (SIMULATE) {
      messageApi.success('Nombre de empresa actualizado (simulación)');
      return;
    }
    try {
      await updateCompany({ company_name: companyName });
      await refetchCompanyInfo();
      messageApi.success('Nombre de empresa actualizado');
    } catch (err) {
      messageApi.error('Error al actualizar el nombre');
    }
  };

  //CAMBIAR EL LOGO
  const handleLogoChange = async (info) => {
    if (info.file.status === 'done') {
      const file = info.file.originFileObj;
      if (!file) return;

      // Vista previa local inmediata
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      if (SIMULATE) {
        messageApi.success('Logo actualizado correctamente (simulación)');
        return;
      }
      await uploadLogo(file);
      try {
        await refetchCompanyLogo();
      } catch (err) {
        console.error('Error al refrescar datos de empresa', err);
      }
    }
  };

  if (loading)
    return (
      <div className={styles.layout}>
        <Spin size="large" />
      </div>
    );

  return (
    <div className={styles.layout}>
      {contextHolder}
      {modalContextHolder}
      <main className={styles.mainContent}>
        <section className={styles.container}>
          <div className={styles.box}>
            {/* Logo */}
            <div className={styles.section}>
              <label className={styles.label}>Logo de la empresa:</label>
              <div className={styles.logoRow}>
                <div className={styles.logoBlock}>
                  <span className={styles.logoTitle}>Actual</span>
                  {logoPreview || logoUrl ? (
                    <Image
                      src={logoPreview || logoUrl || img}
                      alt={`Logo de ${companyName}`}
                      preview={false}
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #4CAF50',
                        padding: '3px',
                      }}
                    />
                  ) : (
                    <div className={styles.noLogo}>No hay logo disponible</div>
                  )}
                </div>
                <div className={styles.logoBlock}>
                  <span className={styles.logoTitle}>Subir nuevo</span>
                  <Upload
                    name="logo"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    accept="image/*"
                    customRequest={({ file, onSuccess }) => {
                      setTimeout(() => {
                        onSuccess('ok');
                      }, 0);
                    }}
                    beforeUpload={(file) => {
                      const isImage = file.type.startsWith('image/');
                      if (!isImage) {
                        messageApi.error('Solo puedes subir archivos de imagen!');
                        return Upload.LIST_IGNORE;
                      }
                      const isLt2M = file.size / 1024 / 1024 < 2;
                      if (!isLt2M) {
                        messageApi.error('La imagen debe ser menor a 2MB!');
                        return Upload.LIST_IGNORE;
                      }

                      // Confirm upload
                      return new Promise((resolve) => {
                        modal.confirm({
                          title: '¿Seguro que quieres subir este logo?',
                          content: `${file.name}`,
                          okText: 'Sí, subir',
                          cancelText: 'Cancelar',
                          onOk: () => resolve(true),
                          onCancel: () => resolve(Upload.LIST_IGNORE),
                        });
                      });
                    }}
                    onChange={handleLogoChange}
                    style={{
                      borderRadius: '50%',
                      border: '2px dashed #4CAF50',
                      width: 100,
                      height: 100,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f3f4f6',
                      cursor: 'pointer',
                    }}
                  >
                    {uploadingLogo ? (
                      <div style={{ color: theme === 'dark' ? '#ffffff' : '#1f2937', textAlign: 'center' }}>
                        <LoadingOutlined />
                        <div style={{ marginTop: 8 }}>Subiendo...</div>
                      </div>
                    ) : (
                      <div style={{ color: theme === 'dark' ? '#ffffff' : '#1f2937', textAlign: 'center' }}>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Subir logo</div>
                      </div>
                    )}
                  </Upload>
                </div>
              </div>
            </div>

            {/* Nombre */}
            <div className={styles.section}>
              <label className={styles.label} htmlFor="companyNameInput">
                Nombre de la empresa:
              </label>
              <div className={styles.nameRow}>
                <Input
                  id="companyNameInput"
                  className={styles.input}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Ingresa el nombre de la empresa"
                />
                <Button
                  type="primary"
                  className={styles.changeBtn}
                  onClick={handleNameChange}
                  loading={updating}
                >
                  Cambiar Nombre
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Botón flotante para cambiar tema */}
      <Button
        className={styles.themeToggle}
        type="default"
        onClick={toggleTheme}
        icon={theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
      >
        {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
      </Button>
    </div>
  );
};

export default System;

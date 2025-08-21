import React from 'react';
import { Button, Spin, Alert } from 'antd';
import {
  ArrowLeft,
  PencilSimple,
  ArrowClockwise,
} from '@phosphor-icons/react';
import { Sun, Moon } from '@phosphor-icons/react';
import styles from './reports.module.css';
import { useTheme } from '../../../context/ThemeContext';

const ReportPreview = ({
  showPreview,
  loading,
  generating,
  error,
  content,
  downloadBtn,
  handleCancel,
  onEdit,
  showEditButton = false,
  onReset,
  showResetButton = false,
  editDisabled = false,
}) => {
  const { theme: appTheme, toggleTheme } = useTheme();
  return (
  <div
    className={`${styles.mainContainer} ${appTheme === 'dark' ? styles.dark : styles.light}`}
    style={{ backgroundColor: appTheme === 'dark' ? '#121212' : '#ffffff' }}
  >
    <div className={styles.previewContainer}>
      <div className={styles.topActions}>
        <div style={{ pointerEvents: 'auto' }}>
          <Button
            type="text"
            icon={<ArrowLeft size={28} weight="bold" />}
            onClick={handleCancel}
            className={styles.actionBtn}
          />
        </div>
        <div
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            gap: 12,
            alignItems: 'center',
          }}
        >
          {showEditButton && onEdit && (
            <Button
              type="primary"
              icon={<PencilSimple size={20} weight="bold" />}
              onClick={onEdit}
              style={{
                background: '#4CAF50',
                border: 'none',
                color: '#fff',
                fontWeight: 600,
                borderRadius: 8,
                height: 42,
                fontSize: 15,
              }}
            >
              Editar Datos
            </Button>
          )}
          {showResetButton && onReset && (
            <Button
              type="default"
              icon={<ArrowClockwise size={20} weight="bold" />}
              onClick={onReset}
              style={{
                border: '1px solid #ff6b35',
                color: '#ff6b35',
                fontWeight: 600,
                borderRadius: 8,
                height: 42,
                fontSize: 15,
              }}
            >
              Restaurar Original
            </Button>
          )}
          {downloadBtn}
        </div>
      </div>
      {(loading || generating) && (
        <div className={styles.spinner}>
          <Spin
            size="large"
            tip="Generando reporte..."
            style={{ color: '#7ed957' }}
          />
        </div>
      )}
      {error && (
        <Alert
          message="Error al generar el reporte"
          description={error.message || 'Intenta nuevamente.'}
          type="error"
          showIcon
          className={styles.alert}
        />
      )}
      <div className={styles.previewContent}>
        {!loading && !generating && !error && content}
      </div>
    </div>

    {/* Botón flotante para cambiar tema en previsualización */}
    <div
      className={`${styles.themeToggleFab} ${
        appTheme === 'dark' ? styles.themeDark : styles.themeLight
      }`}
    >
      <Button
        className={styles.themeBtn}
        type="default"
        onClick={toggleTheme}
        icon={
          appTheme === 'dark' ? (
            <Sun size={18} weight="bold" />
          ) : (
            <Moon size={18} weight="bold" />
          )
        }
      >
        {appTheme === 'dark' ? 'Claro' : 'Oscuro'}
      </Button>
    </div>
  </div>
  );
};

export default ReportPreview;

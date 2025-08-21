import React from 'react';
import {
  Modal,
  Form,
  Input,
  Switch,
  Button,
  Space,
  ConfigProvider,
} from 'antd';
import { useTheme } from '../../../context/ThemeContext';

// Constantes para colores del tema claro
const LIGHT_THEME_COLORS = {
  primary: '#4CAF50',
  primaryHover: '#388E3C',
  primaryLight: '#66BB6A',
  background: '#FFFFFF',
  backgroundDark: '#FAFAFA',
  backgroundDarker: '#F5F5F5',
  border: '#D9D9D9',
  borderLight: '#E8E8E8',
  borderDark: '#BFBFBF',
  borderSecondary: '#F0F0F0',
  text: '#333333',
  textSecondary: '#666666',
  textPlaceholder: '#BFBFBF',
  textDisabled: '#999999',
  error: '#ff4d4f',
  white: '#ffffff',
  transparent: 'transparent',
};

// Constantes para colores del tema oscuro
const DARK_THEME_COLORS = {
  primary: '#4CAF50',
  primaryHover: '#388E3C',
  primaryLight: '#66BB6A',
  background: '#2a2a2a',
  backgroundDark: '#1e1e1e',
  backgroundDarker: '#1a1a1a',
  border: '#555',
  borderLight: '#666',
  borderDark: '#444',
  borderSecondary: '#333',
  text: 'white',
  textSecondary: '#b0b0b0',
  textPlaceholder: '#666',
  textDisabled: '#999999',
  error: '#ff4d4f',
  white: '#ffffff',
  transparent: 'transparent',
};

// Constantes para espaciado y dimensiones
const SPACING = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 15,
  xl: 16,
};

const DIMENSIONS = {
  borderRadius: 6,
  borderRadiusLarge: 8,
  borderRadiusModal: 12,
  buttonHeight: 32,
  switchHandleSize: 14,
  switchTrackHeight: 20,
  switchTrackMinWidth: 40,
};

// Constantes para opacidades y sombras
const EFFECTS = {
  primaryOpacity: 'rgba(76, 175, 80, 0.1)',
  primaryOpacityMedium: 'rgba(76, 175, 80, 0.2)',
  primaryOpacityLight: 'rgba(76, 175, 80, 0.3)',
  maskOpacity: 'rgba(0, 0, 0, 0.7)',
};

// Función helper para crear estilos de botón
const createButtonStyles = (type = 'default') => {
  const baseStyles = {
    padding: `${SPACING.xs}px ${SPACING.xl}px`,
    height: DIMENSIONS.buttonHeight,
    borderRadius: DIMENSIONS.borderRadius,
    fontWeight: 500,
  };

  if (type === 'primary') {
    return {
      ...baseStyles,
      backgroundColor: THEME_COLORS.primary,
      borderColor: THEME_COLORS.primary,
    };
  }

  return {
    ...baseStyles,
    border: `1px solid ${THEME_COLORS.primary}`,
    color: THEME_COLORS.primary,
    backgroundColor: THEME_COLORS.transparent,
  };
};

// Función helper para obtener colores del tema actual
const getThemeColors = (isDark) => isDark ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;

// Función helper para crear estilos de input
const createInputStyles = () => ({
  colorBgContainer: THEME_COLORS.background,
  colorText: THEME_COLORS.text,
  colorTextPlaceholder: THEME_COLORS.textPlaceholder,
  colorBorder: THEME_COLORS.border,
  activeBorderColor: THEME_COLORS.primary,
  hoverBorderColor: THEME_COLORS.borderLight,
  borderRadius: DIMENSIONS.borderRadius,
  paddingInline: SPACING.md,
  paddingBlock: SPACING.xs,
  fontSize: 14,
  colorBgContainerDisabled: EFFECTS.primaryOpacity,
  colorTextDisabled: THEME_COLORS.textPlaceholder,
  colorBorderBg: EFFECTS.primaryOpacityLight,
  activeShadow: `0 0 0 2px ${EFFECTS.primaryOpacityMedium}`,
  boxShadowSecondary: `0 0 0 2px ${EFFECTS.primaryOpacityMedium}`,
});

// Función helper para crear estilos de modal
const createModalStyles = () => ({
  header: {
    borderBottom: `1px solid ${THEME_COLORS.borderDark}`,
    padding: `${SPACING.sm}px ${SPACING.md}px`,
    marginBottom: SPACING.sm,
    backgroundColor: THEME_COLORS.transparent,
  },
  body: {
    padding: `0 ${SPACING.md}px ${SPACING.sm}px`,
    backgroundColor: THEME_COLORS.transparent,
  },
  footer: {
    borderTop: `1px solid ${THEME_COLORS.borderDark}`,
    padding: `${SPACING.sm}px ${SPACING.lg}px`,
    marginTop: SPACING.sm,
    backgroundColor: THEME_COLORS.transparent,
  },
  mask: {
    backgroundColor: EFFECTS.maskOpacity,
  },
});

const BaseModal = ({
  visible,
  onCancel,
  onOk,
  title,
  children,
  confirmLoading = false,
  okText = 'Guardar',
  cancelText = 'Cancelar',
  width = 520,
  initialValues,
  form,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const THEME_COLORS = getThemeColors(isDark);

  // Efecto para manejar valores iniciales del formulario
  React.useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues);
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  // Función callback para manejar la validación y envío
  const handleOk = React.useCallback(async () => {
    try {
      const values = await form.validateFields();
      onOk(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  }, [form, onOk]);

  // Efecto para manejar eventos de teclado
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (!visible) return;

      if (event.key === 'Enter') {
        event.preventDefault();
        handleOk();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
      }
    };

    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, onCancel, handleOk]);

  // Configuración del tema consolidada
  const themeConfig = {
    token: {
      colorPrimary: THEME_COLORS.primary,
      borderRadius: DIMENSIONS.borderRadiusLarge,
      colorBgContainer: THEME_COLORS.background,
      colorBgElevated: THEME_COLORS.background,
      colorBorder: THEME_COLORS.border,
      colorText: THEME_COLORS.text,
      colorTextPlaceholder: THEME_COLORS.textPlaceholder,
      colorTextDisabled: THEME_COLORS.textDisabled,
      colorBgContainerDisabled: THEME_COLORS.backgroundDarker,
      colorBorderSecondary: THEME_COLORS.borderSecondary,
      colorError: THEME_COLORS.error,
    },
    components: {
      Modal: {
        contentBg: isDark 
          ? `linear-gradient(145deg, ${THEME_COLORS.background} 0%, ${THEME_COLORS.backgroundDark} 100%)`
          : THEME_COLORS.background,
        headerBg: THEME_COLORS.transparent,
        titleColor: THEME_COLORS.text,
        colorText: THEME_COLORS.textSecondary,
        borderRadiusLG: DIMENSIONS.borderRadiusModal,
        paddingContentHorizontal: SPACING.md,
        paddingMD: SPACING.sm,
        colorBgElevated: THEME_COLORS.background,
        colorBorder: THEME_COLORS.borderDark,
      },
      Input: createInputStyles(),
      'Input.Password': {
        ...createInputStyles(),
        colorIcon: THEME_COLORS.textPlaceholder,
        colorIconHover: THEME_COLORS.primary,
      },
      Switch: {
        handleBg: THEME_COLORS.white,
        handleSize: DIMENSIONS.switchHandleSize,
        trackHeight: DIMENSIONS.switchTrackHeight,
        trackMinWidth: DIMENSIONS.switchTrackMinWidth,
        colorPrimary: THEME_COLORS.primary,
        colorPrimaryHover: THEME_COLORS.primaryHover,
      },
      Button: {
        defaultBg: THEME_COLORS.transparent,
        defaultBorderColor: THEME_COLORS.primary,
        defaultColor: THEME_COLORS.primary,
        defaultHoverBg: EFFECTS.primaryOpacity,
        defaultHoverBorderColor: THEME_COLORS.primaryLight,
        defaultHoverColor: THEME_COLORS.primaryLight,
        primaryColor: THEME_COLORS.white,
        primaryBg: THEME_COLORS.primary,
        primaryBorderColor: THEME_COLORS.primary,
        primaryHoverBg: THEME_COLORS.primaryHover,
        primaryHoverBorderColor: THEME_COLORS.primaryHover,
        borderRadius: DIMENSIONS.borderRadius,
        fontWeight: 500,
        paddingInline: SPACING.xl,
        paddingBlock: SPACING.xs,
      },
      Form: {
        labelColor: THEME_COLORS.text,
        labelFontSize: 14,
        labelRequiredMarkColor: THEME_COLORS.error,
        itemMarginBottom: SPACING.md,
      },
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <Modal
        title={title}
        visible={visible}
        onCancel={onCancel}
        footer={
          <Space size={SPACING.sm}>
            <Button
              onClick={onCancel}
              disabled={confirmLoading}
              style={createButtonStyles('default')}
              className="modal-cancel-btn"
            >
              {cancelText}
            </Button>
            <Button
              type="primary"
              loading={confirmLoading}
              onClick={handleOk}
              style={createButtonStyles('primary')}
              className="modal-ok-btn"
            >
              {okText}
            </Button>
          </Space>
        }
        width={width}
        centered
        destroyOnClose
        styles={createModalStyles()}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          size="small"
        >
          {children}
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default BaseModal;

import React, { useState, useEffect, useMemo } from 'react';
import { ConfigProvider, DatePicker, Button, theme as antdTheme, Card } from 'antd';
import ReportSelector from './ReportSelector';
import ReportPreview from './ReportPreview';
import EditCashReportModal from './EditCashReportModal';
import styles from './reports.module.css';
import dayjs from 'dayjs';
// Report hooks omitidos en la simulación (sin backend)
import { PDFViewer, Document, Page, View } from '@react-pdf/renderer';
import ExcelPreviewTable from '../../../components/PdfTemplates/ExcelPreviewTable';
import ExcelJS from 'exceljs';
import {
  FilePlus,
  ChartPieSlice,
  Users,
  Wallet,
  CalendarBlank,
} from '@phosphor-icons/react';
import { Sun, Moon } from '@phosphor-icons/react';
import { useTheme } from '../../../context/ThemeContext';

const reportOptions = [
  {
    key: 'diariaTerapeuta',
    title: 'Reporte Diario de Terapeutas',
    description:
      'Resumen de citas y actividades por cada terapeuta en un día específico.',
    icon: <Users size={32} color="#4CAF50" />,
  },
  {
    key: 'pacientesTerapeuta',
    title: 'Pacientes por Terapeuta',
    description:
      'Lista de pacientes atendidos por cada terapeuta en una fecha determinada.',
    icon: <ChartPieSlice size={32} color="#4CAF50" />,
  },
  {
    key: 'reporteCaja',
    title: 'Reporte de Caja Diario',
    description: 'Detalle de los ingresos y transacciones financieras del día.',
    icon: <Wallet size={32} color="#4CAF50" />,
  },
  {
    key: 'rangoCitas',
    title: 'Citas por Rango de Fechas',
    description:
      'Exporta un listado de todas las citas programadas entre dos fechas.',
    icon: <CalendarBlank size={32} color="#4CAF50" />,
  },
];

const Reporte = () => {
  const { theme: appTheme, toggleTheme } = useTheme();
  const [reportType, setReportType] = useState(null);
  const [date, setDate] = useState(dayjs());
  const [range, setRange] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [excelPagination, setExcelPagination] = useState({
    current: 1,
    pageSize: 20,
  });

  // Nuevos estados para el modal de edición
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedCajaData, setEditedCajaData] = useState(null);

  // Sistema/empresa: se omitió carga de información no utilizada en la simulación

  // Datos de reportes no se cargan en modo demo
  const cajaData = null;

  const safeDate = useMemo(() => date || dayjs(), [date]);

  // Sin datos simulados para el modal; se usará cajaData cuando exista

  // Memoize PDF viewer styles to prevent re-renders
  const pdfViewerStyle = useMemo(
    () => ({
      minHeight: 500,
      maxHeight: 'calc(96vh - 180px)',
      margin: '0 auto',
      display: 'block',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      borderRadius: 14,
    }),
    [],
  );

  // Memoize theme config to prevent re-renders
  const themeConfig = useMemo(() => {
    const isDark = appTheme === 'dark';
    return {
      algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        colorBgBase: isDark ? '#121212' : '#ffffff',
        colorTextBase: isDark ? '#ffffff' : '#111111',
      },
      components: {
        Button: {
          colorPrimary: '#00AA55',
          colorTextLightSolid: '#ffffff',
          colorPrimaryHover: '#00cc6a',
          colorPrimaryActive: '#00AA55',
        },
        DatePicker: {
          colorTextPlaceholder: isDark ? '#AAAAAA' : '#8c8c8c',
          colorBgContainer: isDark ? '#333333' : '#ffffff',
          colorText: isDark ? '#FFFFFF' : '#111111',
          colorBorder: isDark ? '#444444' : '#d9d9d9',
          borderRadius: 4,
          hoverBorderColor: isDark ? '#555555' : '#bfbfbf',
          activeBorderColor: '#00AA55',
          colorIcon: isDark ? '#FFFFFF' : '#111111',
          colorIconHover: '#00AA55',
          colorBgElevated: isDark ? '#121212' : '#ffffff',
          colorPrimary: '#00AA55',
          colorTextDisabled: isDark ? '#333333' : '#bfbfbf',
          colorTextHeading: isDark ? '#FFFFFF' : '#111111',
          cellHoverBg: isDark ? '#00AA55' : '#e6f7ee',
          colorSplit: isDark ? '#444444' : '#f0f0f0',
        },
        Card: {
          colorBgContainer: isDark ? '#242424' : '#ffffff',
          colorBorderSecondary: isDark ? '#333333' : '#e5e5e5',
          borderRadiusLG: 16,
        },
        Modal: {
          colorBgElevated: isDark ? '#1f1f1f' : '#ffffff',
          colorText: isDark ? '#fff' : '#111',
          borderRadius: 12,
        },
      },
    };
  }, [appTheme]);

  // Resetear paginación (en demo no depende de datos remotos)
  useEffect(() => {
    setExcelPagination((prev) => ({ current: 1, pageSize: prev.pageSize }));
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    // Simulación sin backend: abrir vista previa según tipo
    if (reportType === 'diariaTerapeuta') {
      setShowPreview('diariaTerapeuta');
    } else if (reportType === 'pacientesTerapeuta') {
      setShowPreview('pacientesTerapeuta');
    } else if (reportType === 'reporteCaja') {
      setShowPreview('reporteCaja');
    } else if (reportType === 'rangoCitas') {
      // Simulación sin backend para Excel
      setShowPreview('rangoCitas');
    }
    setGenerating(false);
  };

  const handleCancel = () => {
    setShowPreview(false);
    setReportType(null);
    setDate(dayjs());
    setRange(null);
    setEditedCajaData(null); // Resetear datos editados
  };

  // Nueva función para manejar la edición
  const handleEditCashReport = () => {
    setShowEditModal(true);
  };

  // Nueva función para guardar los cambios editados
  const handleSaveEditedData = (updatedData) => {
    setEditedCajaData(updatedData);
    setShowEditModal(false);
  };

  // Nueva función para cancelar la edición
  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  // Nueva función para resetear los datos editados
  const handleResetData = () => {
    setEditedCajaData(null);
  };

  // Nueva función para exportar a Excel usando exceljs
  const exportToExcel = async (data, fileName = 'Reporte_Rango_Citas.xlsx') => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Citas');
    worksheet.columns = [
      { header: 'ID Paciente', key: 'patient_id', width: 12 },
      { header: 'Documento', key: 'document_number', width: 15 },
      { header: 'Nombre Completo', key: 'full_name', width: 30 },
      { header: 'Teléfono', key: 'primary_phone', width: 15 },
      { header: 'Fecha', key: 'appointment_date', width: 12 },
      { header: 'Hora', key: 'appointment_hour', width: 10 },
    ];
    data.forEach((item) => {
      worksheet.addRow({
        patient_id: item.patient_id,
        document_number: item.document_number,
        full_name: `${item.name} ${item.paternal_lastname} ${item.maternal_lastname}`,
        primary_phone: item.primary_phone,
        appointment_date: item.appointment_date,
        appointment_hour: item.appointment_hour,
      });
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Lógica para la previsualización y descarga
  let loading = false,
    error = null,
    content = null,
    downloadBtn = null;
  if (showPreview) {
    if (showPreview === 'diariaTerapeuta') {
      // Simulación: PDF en blanco sin depender de datos
      loading = false;
      error = null;
      content = (
        <PDFViewer
          key={`diaria-${safeDate.format('YYYY-MM-DD')}`}
          width="100%"
          height="95%"
          style={pdfViewerStyle}
        >
          <Document>
            <Page size="A4" style={{ backgroundColor: '#ffffff' }}>
              <View style={{ flex: 1 }} />
            </Page>
          </Document>
        </PDFViewer>
      );
    } else if (showPreview === 'pacientesTerapeuta') {
      // Simulación: PDF en blanco sin depender de datos
      loading = false;
      error = null;
      content = (
        <PDFViewer
          key={`pacientes-${safeDate.format('YYYY-MM-DD')}`}
          width="100%"
          height="95%"
          style={pdfViewerStyle}
        >
          <Document>
            <Page size="A4" style={{ backgroundColor: '#ffffff' }}>
              <View style={{ flex: 1 }} />
            </Page>
          </Document>
        </PDFViewer>
      );
    } else if (showPreview === 'reporteCaja') {
      // Simulación: PDF en blanco sin depender de datos
      loading = false;
      error = null;
      content = (
        <PDFViewer
          key={`caja-${safeDate.format('YYYY-MM-DD')}`}
          width="100%"
          height="95%"
          style={pdfViewerStyle}
        >
          <Document>
            <Page size="A4" style={{ backgroundColor: '#ffffff' }}>
              <View style={{ flex: 1 }} />
            </Page>
          </Document>
        </PDFViewer>
      );
    } else if (showPreview === 'rangoCitas') {
      // Simulación: tabla vacía y botón de descarga siempre visible
      loading = false;
      error = null;
      content = (
        <ExcelPreviewTable
          data={{ appointments: [] }}
          pagination={excelPagination}
          onPaginationChange={setExcelPagination}
        />
      );
      downloadBtn = (
        <Button
          type="primary"
          style={{
            marginTop: 10,
            background: '#4CAF50',
            border: 'none',
            color: '#fff',
            fontWeight: 600,
            borderRadius: 8,
            height: 42,
            fontSize: 15,
          }}
          onClick={() =>
            exportToExcel(
              [],
              `Reporte_Rango_Citas_${range && range[0] ? range[0].format('YYYY-MM-DD') : 'inicio'}_${range && range[1] ? range[1].format('YYYY-MM-DD') : 'fin'}.xlsx`,
            )
          }
        >
          Descargar Excel
        </Button>
      );
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene que la página se recargue
    if (reportType && !generating) {
      // Doble chequeo para seguridad
      handleGenerate();
    }
  };

  if (showPreview) {
    return (
      <ConfigProvider theme={themeConfig}>
        <ReportPreview
          showPreview={showPreview}
          loading={loading}
          generating={generating}
          error={error}
          content={content}
          downloadBtn={downloadBtn}
          handleCancel={handleCancel}
          onEdit={
            showPreview === 'reporteCaja' ? handleEditCashReport : undefined
          }
          showEditButton={showPreview === 'reporteCaja'}
          editDisabled={showPreview === 'reporteCaja' && !editedCajaData && !cajaData}
          onReset={showPreview === 'reporteCaja' ? handleResetData : undefined}
          showResetButton={showPreview === 'reporteCaja' && !!editedCajaData}
        />

        {/* Modal de edición para reporte de caja */}
        {showPreview === 'reporteCaja' && (
          <EditCashReportModal
            visible={showEditModal}
            onCancel={handleCancelEdit}
            onSave={handleSaveEditedData}
            data={editedCajaData || cajaData}
            date={safeDate}
          />
        )}
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div
        className={`${styles.mainContainer} ${appTheme === 'dark' ? styles.dark : styles.light}`}
        style={{ backgroundColor: appTheme === 'dark' ? '#121212' : '#ffffff' }}
      >
        <Card className={styles.card}>
          <h2 className={styles.title}>Generador de Reportes</h2>

          <form onSubmit={handleSubmit}>
            <ReportSelector
              options={reportOptions}
              selectedReport={reportType}
              onSelectReport={setReportType}
            />

            {reportType && (
              <div className={styles.controlsWrapper}>
                <div className={styles.datePickerContainer}>
                  {reportType === 'rangoCitas' ? (
                    <DatePicker.RangePicker
                      style={{ width: '100%' }}
                      format="DD-MM-YYYY"
                      onChange={(dates) => setRange(dates)}
                      value={range}
                    />
                  ) : (
                    <DatePicker
                      style={{ width: '100%' }}
                      format="DD-MM-YYYY"
                      value={date}
                      onChange={(d) => setDate(d)}
                    />
                  )}
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<FilePlus size={20} weight="bold" />}
                  onClick={handleGenerate}
                  loading={generating}
                  disabled={!reportType || generating}
                  className={styles.generateBtn}
                >
                  Generar
                </Button>
              </div>
            )}
          </form>
        </Card>

        {/* Botón flotante para cambiar tema */}
        <div
          className={`${styles.themeToggleFab} ${
            appTheme === 'dark' ? styles.themeDark : styles.themeLight
          }`}
        >
          <Button
            className={styles.themeBtn}
            type="default"
            onClick={toggleTheme}
            icon={appTheme === 'dark' ? (
              <Sun size={18} weight="bold" />
            ) : (
              <Moon size={18} weight="bold" />
            )}
          >
            {appTheme === 'dark' ? 'Claro' : 'Oscuro'}
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Reporte;

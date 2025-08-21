import { useState, useEffect, useMemo } from 'react';
import {
  Card,
  Modal,
  Table,
  Radio,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Typography,
  ConfigProvider,
  message,
  Spin,
} from 'antd';
import styles from './PatientHistory.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import CustomSearch from '../../../components/Search/CustomSearch';
import {
  useStaff,
  usePatientHistory,
  usePatientAppointments,
  useUpdatePatientHistory,
  useUpdateAppointment,
} from '../hook/historyHook';
import { updateAppointmentById } from '../service/historyService';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import TicketPDF from '../../../components/PdfTemplates/TicketPDF';
import { PDFViewer } from '@react-pdf/renderer';
import FichaPDF from '../../../components/PdfTemplates/FichaPDF';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// Función para obtener el tema actual
const getCurrentTheme = () => {
  return document.documentElement.getAttribute('data-theme') || 'light';
};

// Función para obtener el tema de Ant Design basado en el tema actual
const getAntTheme = (themeMode) => {
  const isDark = themeMode === 'dark';
  
  return {
    token: {
      colorPrimary: '#4caf50',
      colorBgContainer: isDark ? '#222' : '#ffffff',
      colorText: isDark ? '#eee' : '#333333',
      colorBorder: isDark ? '#333' : '#e0e0e0',
      colorBgElevated: isDark ? '#222' : '#ffffff',
      colorTextHeading: '#4caf50',
      colorTextLabel: '#4caf50',
      borderRadius: 6,
      fontSize: 14,
      fontFamily: 'Arial, sans-serif',
      colorTextLightSolid: '#ffffff',
    },
    components: {
      Table: {
        headerBg: isDark ? '#272727' : '#f8f9fa',
        headerColor: isDark ? '#eee' : '#333333',
        colorBgContainer: isDark ? '#222' : '#ffffff',
        borderColor: isDark ? '#333' : '#e0e0e0',
        rowHoverBg: isDark ? '#333' : '#f5f5f5',
        cellPaddingBlock: 12,
        cellPaddingInline: 16,
      },
      Radio: {
        colorPrimary: '#4caf50',
        colorBgContainer: isDark ? '#222' : '#ffffff',
      },
      Button: {
        colorPrimary: '#4caf50',
        colorPrimaryHover: '#388e3c',
        colorPrimaryActive: '#2e7d32',
        defaultBorderColor: isDark ? '#333' : '#e0e0e0',
        defaultColor: isDark ? '#eee' : '#333333',
        defaultBg: isDark ? '#222' : '#ffffff',
        dangerBorderColor: '#f44336',
        dangerColor: '#ffffff',
        dangerBg: '#f44336',
      },
      Input: {
        colorBgContainer: isDark ? '#222' : '#ffffff',
        colorBorder: isDark ? '#333' : '#e0e0e0',
        colorText: isDark ? '#eee' : '#333333',
        colorTextDisabled: isDark ? '#999' : '#999999',
        activeBorderColor: '#4caf50',
        hoverBorderColor: '#4caf50',
      },
      Select: {
        colorBgContainer: isDark ? '#222' : '#ffffff',
        colorBorder: isDark ? '#333' : '#e0e0e0',
        colorText: isDark ? '#eee' : '#333333',
        optionSelectedBg: '#4caf50',
        optionSelectedColor: '#ffffff',
        optionActiveBg: isDark ? '#333' : '#f5f5f5',
      },
      DatePicker: {
        colorBgContainer: isDark ? '#222' : '#ffffff',
        colorBorder: isDark ? '#333' : '#e0e0e0',
        colorText: isDark ? '#eee' : '#333333',
        cellActiveWithRangeBg: '#4caf50',
        cellHoverBg: isDark ? '#333' : '#f5f5f5',
        panelBg: isDark ? '#222' : '#ffffff',
        panelInputBg: isDark ? '#222' : '#ffffff',
        colorTextHeading: isDark ? '#eee' : '#333333',
        colorTextDescription: isDark ? '#ccc' : '#666666',
        colorIcon: isDark ? '#ccc' : '#666666',
        colorIconHover: '#4caf50',
        cellBg: isDark ? '#222' : '#ffffff',
        cellColor: isDark ? '#eee' : '#333333',
        cellActiveBg: '#4caf50',
        timeColumnBg: isDark ? '#222' : '#ffffff',
      },
      Card: {
        colorBgContainer: isDark ? '#161616' : '#ffffff',
        colorBorderSecondary: '#4caf50',
      },
      Form: {
        labelColor: '#4caf50',
        itemMarginBottom: 16,
      },
    },
  };
};

// Constantes para valores reutilizables
const YES_NO_OPTIONS = [
  { value: 'Sí', label: 'Sí' },
  { value: 'No', label: 'No' }
];

const PatientHistory = () => {
  const [form] = Form.useForm();
  const [therapist, setTherapist] = useState(null);
  const [showTherapistDropdown, setShowTherapistDropdown] = useState(false);
  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTherapistId, setSelectedTherapistId] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [loadingTicket, setLoadingTicket] = useState(false);
  const [showFichaModal, setShowFichaModal] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());

  // Función para cambiar el tema
  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    setCurrentTheme(newTheme);
    // Guardar en localStorage para persistencia
    localStorage.setItem('theme', newTheme);
  };

  // Efecto para cargar el tema guardado
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setCurrentTheme(savedTheme);
  }, []);

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const appointmentFromState = location.state?.appointment;
  
  // Hooks personalizados
  const { staff, loading, setSearchTerm } = useStaff();
  const { data: patientHistory } = usePatientHistory(id);
  const isFemale = patientHistory?.data?.patient?.sex === 'F';
  const {
    appointments,
    lastAppointment,
    loadingAppointments,
    appointmentsError,
  } = usePatientAppointments(id);
  const { updateHistory, loading: updatingHistory } = useUpdatePatientHistory();
  const { updateAppointment } = useUpdateAppointment();

  // Memoización de datos calculados
  const appointmentDates = useMemo(() => {
    return [...new Set(appointments?.map((a) => a.appointment_date) || [])];
  }, [appointments]);

  const selectedAppointment = useMemo(() => {
    return appointments?.find(
      (a) => a.appointment_date === selectedAppointmentDate,
    ) || null;
  }, [appointments, selectedAppointmentDate]);

  // Función helper para construir nombre completo
  const buildFullName = (person) => {
    if (!person) return '';
    return `${person.paternal_lastname || ''} ${person.maternal_lastname || ''} ${person.name || ''}`.trim();
  };

  // Función helper para establecer valores del formulario
  const setFormValues = (values) => {
    form.setFieldsValue(values);
  };

  // Función helper para manejar campos de sí/no
  const handleYesNoField = (value) => value === 'Sí';

  // Efecto para inicializar el formulario con datos del historial
  useEffect(() => {
    if (patientHistory?.data?.patient) {
      const { patient, ...historyData } = patientHistory.data;

      const formValues = {
        // Información del paciente
        patientName: buildFullName(patient),
        
        // Observaciones
        observationPrivate: historyData?.private_observation || '',
        observation: historyData?.observation || '',
        
        // Información física
        talla: historyData?.height || '',
        pesoInicial: historyData?.weight || '',
        ultimoPeso: historyData?.last_weight || '',
        
        // Información médica
        testimonio: historyData?.testimony ? 'Sí' : 'No',
        gestacion: isFemale ? (historyData?.gestation ? 'Sí' : 'No') : undefined,
        menstruacion: isFemale ? (historyData?.menstruation ? 'Sí' : 'No') : undefined,
        tipoDIU: isFemale ? historyData?.diu_type || '' : undefined,
        
        // Campos adicionales
        diagnosticosMedicos: historyData?.diagnosticos_medicos || '',
        operaciones: historyData?.operaciones || '',
        medicamentos: historyData?.medicamentos || '',
        dolencias: historyData?.dolencias || '',
        diagnosticosReflexologia: historyData?.diagnosticos_reflexologia || '',
        observacionesAdicionales: historyData?.observaciones_adicionales || '',
        antecedentesFamiliares: historyData?.antecedentes_familiares || '',
        alergias: historyData?.alergias || '',
        
        // Fechas
        fechaInicio: dayjs(),
      };

      setFormValues(formValues);

      // Manejo del terapeuta
      if (historyData?.therapist) {
        setTherapist(historyData.therapist.full_name || '');
        setSelectedTherapistId(historyData.therapist.id || null);
      } else {
        setTherapist(null);
        setSelectedTherapistId(null);
      }
    } else {
      form.resetFields();
      setTherapist(null);
      setSelectedTherapistId(null);
    }
  }, [patientHistory, form, isFemale]);

  // Efecto para actualizar formulario cuando cambia la cita seleccionada
  useEffect(() => {
    if (!selectedAppointmentDate || !Array.isArray(appointments)) return;

    const appointment = appointments.find(
      (a) => a.appointment_date === selectedAppointmentDate,
    );

    if (appointment) {
      const therapistObj = appointment.therapist;
      const fullName = buildFullName(therapistObj);
      
      setFormValues({
        diagnosticosMedicos: appointment.diagnosis ?? '',
        dolencias: appointment.ailments ?? '',
        medicamentos: appointment.medications ?? '',
        operaciones: appointment.surgeries ?? '',
        observacionesAdicionales: appointment.observation ?? '',
        diagnosticosReflexologia: appointment.reflexology_diagnostics ?? '',
        therapist: fullName,
      });

      setTherapist(fullName || null);
      setSelectedTherapistId(therapistObj?.id ?? null);
    }
  }, [selectedAppointmentDate, appointments, form]);

  // Efecto para establecer fecha de cita inicial
  useEffect(() => {
    if (appointmentFromState?.appointment_date) {
      setSelectedAppointmentDate(appointmentFromState.appointment_date);
    } else if (lastAppointment?.appointment_date) {
      setSelectedAppointmentDate(lastAppointment.appointment_date);
    }
  }, [appointmentFromState, lastAppointment]);

  // Funciones del modal de terapeutas
  const showTherapistModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
  
  const handleOk = () => {
    if (selectedTherapistId) {
      const selected = staff.find((t) => t.id === selectedTherapistId);
      if (selected) {
        setTherapist(selected.full_name);
        setFormValues({ therapist: selected.full_name });
      }
    }
    setIsModalVisible(false);
  };

  const handleSelectTherapist = (id) => setSelectedTherapistId(id);
  
  const handleRemoveTherapist = () => {
    setTherapist(null);
    setSelectedTherapistId(null);
    setFormValues({ therapist: '' });
  };

  // Función principal de envío del formulario
  const onFinish = async (values) => {
    const historyId = patientHistory?.data?.id;
    const appointmentId = selectedAppointment?.id;

    if (!historyId || !appointmentId) {
      message.error('Falta el ID del historial o la cita.');
      return;
    }

    const historyPayload = {
      weight: values.pesoInicial,
      last_weight: values.ultimoPeso,
      height: values.talla,
      observation: values.observation,
      private_observation: values.observationPrivate,
      diagnosticos_medicos: values.diagnosticosMedicos,
      operaciones: values.operaciones,
      medicamentos: values.medicamentos,
      dolencias: values.dolencias,
      diagnosticos_reflexologia: values.diagnosticosReflexologia,
      observaciones_adicionales: values.observacionesAdicionales,
      antecedentes_familiares: values.antecedentesFamiliares,
      alergias: values.alergias,
      testimony: handleYesNoField(values.testimonio),
      gestation: isFemale ? handleYesNoField(values.gestacion) : undefined,
      menstruation: isFemale ? handleYesNoField(values.menstruacion) : undefined,
      diu_type: values.tipoDIU,
      therapist_id: selectedTherapistId,
    };

    const appointmentPayload = {
      appointment_date: selectedAppointmentDate,
      ailments: values.dolencias,
      diagnosis: values.diagnosticosMedicos,
      surgeries: values.operaciones,
      reflexology_diagnostics: values.diagnosticosReflexologia,
      medications: values.medicamentos,
      observation: values.observacionesAdicionales,
      initial_date: dayjs(values.fechaInicio).format('YYYY-MM-DD'),
      final_date: dayjs(values.fechaInicio).add(5, 'day').format('YYYY-MM-DD'),
      appointment_type: 'CC',
      payment: '50.00',
      appointment_status_id: 2,
      payment_type_id: 2,
      patient_id: patientHistory?.data?.patient?.id,
      therapist_id: selectedTherapistId,
    };

    try {
      await updateHistory(historyId, historyPayload);
      await updateAppointment(appointmentId, appointmentPayload);
      navigate(-1);
    } catch (e) {
      console.error('Error actualizando historial y cita:', e);
    }
  };

  // Columnas de la tabla de terapeutas
  const columns = [
    {
      title: 'Seleccionar',
      dataIndex: 'id',
      align: 'center',
      render: (id) => (
        <Radio
          checked={selectedTherapistId === id}
          onChange={() => handleSelectTherapist(id)}
          style={{ color: '#ffffff' }}
        />
      ),
      width: 150,
    },
    {
      title: 'Terapeuta',
      dataIndex: 'full_name',
      key: 'name',
    },
  ];

  // Renderizado del loading
  if (loadingAppointments || !patientHistory) {
    return (
      <ConfigProvider theme={{ token: { colorPrimary: '#4caf50' } }}>
        <Spin
          size="large"
          tip="Cargando historial..."
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
          }}
        />
      </ConfigProvider>
    );
  }

  // Componente para campos de diagnóstico (reutilizable)
  const DiagnosticField = ({ name, label }) => (
    <div className={styles.column}>
      <Form.Item name={name} label={label} className={styles.formItem}>
        <TextArea rows={3} className={styles.diagnosticTextArea} />
      </Form.Item>
    </div>
  );

  // Componente para campos físicos (reutilizable)
  const PhysicalInfoField = ({ name, label, type = 'input' }) => (
    <Form.Item name={name} label={label} className={styles.physicalInfoItem}>
      {type === 'select' ? (
        <Select className={styles.select}>
          {YES_NO_OPTIONS.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      ) : (
        <Input className={styles.input} />
      )}
    </Form.Item>
  );

  return (
    <ConfigProvider theme={getAntTheme(currentTheme)}>
      <div className={styles.container}>
        {/* Botón de cambio de tema */}
        <button 
          className={styles.themeToggle}
          onClick={toggleTheme}
          title={`Cambiar a tema ${currentTheme === 'light' ? 'oscuro' : 'claro'}`}
        >
          {currentTheme === 'light' ? '🌙' : '☀️'} 
          {currentTheme === 'light' ? ' Modo Oscuro' : ' Modo Claro'}
        </button>
        <Card className={styles.card}>
          <Title level={2} className={styles.title}>
            Detalles del Historial
          </Title>

          <Form
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            className={styles.form}
          >
            {/* Fila: Paciente y Observación */}
            <div className={styles.flexRow}>
              <Form.Item
                name="patientName"
                label="Paciente"
                className={styles.flexItem}
              >
                <Input disabled className={styles.input} />
              </Form.Item>
              <Form.Item
                name="observation"
                label="Observación"
                className={styles.flexItem}
              >
                <TextArea rows={1} className={styles.textarea} />
              </Form.Item>
            </div>

            <Title level={3} className={styles.sectionTitle}>
              Citas
            </Title>

            {/* Fila: Fecha de la Cita y Terapeuta */}
            <div className={styles.flexRow}>
              <Form.Item label="Fecha de la Cita" className={styles.flexItem}>
                <Select
                  value={selectedAppointmentDate}
                  onChange={setSelectedAppointmentDate}
                  className={styles.select}
                  placeholder="Seleccione una fecha"
                  loading={loadingAppointments}
                >
                  {appointmentDates.map((date) => (
                    <Option key={date} value={date}>
                      {dayjs(date).format('DD/MM/YYYY')}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="therapist"
                label="Terapeuta"
                className={styles.flexItem}
              >
                <div className={styles.therapistRow}>
                  <Input
                    disabled
                    value={therapist || 'No se ha seleccionado terapeuta'}
                    className={styles.input}
                  />
                  <Button
                    type="primary"
                    onClick={showTherapistModal}
                    className={styles.selectButton}
                  >
                    Seleccionar
                  </Button>
                  {form.getFieldValue('therapist') && (
                    <Button
                      danger
                      onClick={handleRemoveTherapist}
                      className={styles.removeButton}
                    >
                      Eliminar
                    </Button>
                  )}
                </div>
              </Form.Item>
            </div>

            {/* Campos de diagnóstico - Primera fila */}
            <div className={styles.threeColumnLayout}>
              <DiagnosticField name="diagnosticosMedicos" label="Diagnósticos médicos" />
              <DiagnosticField name="dolencias" label="Dolencias" />
              <DiagnosticField name="medicamentos" label="Medicamentos" />
            </div>

            {/* Campos de diagnóstico - Segunda fila */}
            <div className={styles.threeColumnLayout}>
              <DiagnosticField name="operaciones" label="Operaciones" />
              <DiagnosticField name="observacionesAdicionales" label="Observaciones" />
              <DiagnosticField name="diagnosticosReflexologia" label="Diagnósticos de Reflexología" />
            </div>

            {/* Información física */}
            <div className={styles.physicalInfoRow}>
              <PhysicalInfoField name="talla" label="Talla" />
              <PhysicalInfoField name="pesoInicial" label="Peso Inicial" />
              <PhysicalInfoField name="ultimoPeso" label="Último Peso" />
              <PhysicalInfoField name="testimonio" label="Testimonio" type="select" />

              {/* Campos específicos para mujeres */}
              {isFemale && (
                <>
                  <PhysicalInfoField name="gestacion" label="Gestación" type="select" />
                  <PhysicalInfoField name="menstruacion" label="Menstruación" type="select" />
                  <PhysicalInfoField name="tipoDIU" label="Tipo DIU" />
                </>
              )}
            </div>

            {/* Sección inferior con fecha y botones */}
            <div className={styles.bottomSection}>
              <Form.Item
                name="fechaInicio"
                label="Fecha de Inicio"
                className={styles.startDateSection}
              >
                <DatePicker className={styles.datePicker} format="DD-MM-YY" />
              </Form.Item>

              <div className={styles.actionButtons}>
                <Button
                  className={styles.printButton}
                  onClick={() => setShowTicketModal(true)}
                  disabled={!selectedAppointment}
                >
                  Generar Boleta
                </Button>
                <Button
                  className={styles.printButton}
                  onClick={() => setShowFichaModal(true)}
                  disabled={!selectedAppointment}
                >
                  Generar Ticket
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.saveButton}
                >
                  Guardar Cambios
                </Button>
                <Button
                  className={styles.cancelButton}
                  onClick={() => navigate(-1)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </Form>
        </Card>

        {/* Modal de selección de terapeutas */}
        <Modal
          title="Lista de Terapeutas"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancelar
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleOk}
              disabled={!selectedTherapistId}
            >
              Seleccionar
            </Button>,
          ]}
        >
          <CustomSearch
            placeholder="Buscar por Apellido/Nombre o DNI..."
            onSearch={(value) => setSearchTerm(value)}
            width="100%"
            style={{ marginBottom: 16 }}
          />
          <Table
            columns={columns}
            dataSource={staff}
            rowKey="id"
            loading={loading}
            scroll={{ y: 200 }}
            pagination={false}
            rowClassName={() => styles.tableRow}
            className={styles.therapistTable}
          />
        </Modal>

        {/* Modal para generar boleta */}
        <Modal
          open={showTicketModal}
          onCancel={() => setShowTicketModal(false)}
          footer={null}
          width={420}
          bodyStyle={{ padding: 0 }}
        >
          {selectedAppointment && (
            <PDFViewer width="100%" height={600} showToolbar={true}>
              <TicketPDF
                company={{
                  name: 'REFLEXOPERU',
                  address: 'Calle Las Golondrinas N° 153 - Urb. Los Nogales',
                  phone: '01-503-8416',
                  email: 'reflexoperu@reflexoperu.com',
                  city: 'LIMA - PERU',
                  exonerated: 'EXONERADO DE TRIBUTOS',
                  di: 'D.I. 626-D.I.23211',
                }}
                ticket={{
                  number: selectedAppointment.ticket_number,
                  date: dayjs(selectedAppointment.appointment_date).format('DD/MM/YYYY'),
                  patient: buildFullName(patientHistory?.data?.patient),
                  service: 'Consulta',
                  unit: 1,
                  amount: `S/ ${Number(selectedAppointment.payment).toFixed(2)}`,
                  paymentType: selectedAppointment.payment_type?.name || 'Sin especificar',
                }}
              />
            </PDFViewer>
          )}
        </Modal>

        {/* Modal para generar ficha */}
        <Modal
          open={showFichaModal}
          onCancel={() => setShowFichaModal(false)}
          footer={null}
          width={420}
          bodyStyle={{ padding: 0 }}
        >
          {selectedAppointment && patientHistory?.data && (
            <PDFViewer width="100%" height={600} showToolbar={true}>
              <FichaPDF
                cita={selectedAppointment}
                paciente={patientHistory.data.patient}
                visitas={appointments.length}
                historia={patientHistory.data}
              />
            </PDFViewer>
          )}
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default PatientHistory;

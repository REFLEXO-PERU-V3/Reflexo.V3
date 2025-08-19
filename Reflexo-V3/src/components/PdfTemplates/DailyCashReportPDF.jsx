import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { colors, fonts, spacing, sizes, commonStyles } from '../../css/pdfTheme';

const defaultLogo = '/src/assets/Img/Dashboard/MiniLogoReflexo.png';
const defaultClinicName = 'Reflexo Perú';

const styles = StyleSheet.create({
  page: {
    ...commonStyles.page,
  },
  // Cabecera
  header: {
    ...commonStyles.header,
  },
  logo: {
    ...commonStyles.logo,
  },
  headerTitles: {
    ...commonStyles.headerTitles,
  },
  clinicName: {
    ...commonStyles.clinicName,
  },
  reportTitle: {
    ...commonStyles.reportTitle,
  },
  headerInfo: {
    ...commonStyles.headerInfo,
  },
  infoText: {
    ...commonStyles.infoText,
  },
  divider: {
    ...commonStyles.divider,
  },
  // Sección de Resumen
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.lightBackground,
    padding: spacing.summaryPadding,
    borderRadius: sizes.borderRadius,
    border: `1px solid ${colors.border}`,
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: sizes.fontSize.medium,
    color: colors.textLight,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: sizes.fontSize.title,
    color: colors.darkGreen,
    fontFamily: fonts.bold,
  },
  // Estilos de la tabla
  table: {
    ...commonStyles.table,
  },
  tableHeader: {
    ...commonStyles.tableHeader,
  },
  headerCell: {
    ...commonStyles.headerCell,
  },
  tableRow: {
    ...commonStyles.tableRow,
  },
  rowOdd: {
    ...commonStyles.rowOdd,
  },
  tableCell: {
    ...commonStyles.tableCell,
  },
  cellMethod: {
    flex: 2,
    fontFamily: fonts.bold,
  },
  cellCount: {
    flex: 1,
    textAlign: 'center',
  },
  cellAmount: {
    flex: 1,
    textAlign: 'right',
  },
  // Pie de tabla
  tableFooter: {
    ...commonStyles.tableFooter,
  },
  footerLabel: {
    flex: 3,
    ...commonStyles.footerLabel,
  },
  footerValue: {
    flex: 1,
    ...commonStyles.footerValue,
  },
  // Pie de página del documento
  footer: {
    ...commonStyles.footer,
  },
});

const DailyCashReportPDF = ({
  data,
  date,
  logoUrl,
  companyInfo,
  isEdited = false,
}) => {
  const rows = Object.values(data || {});
  const now = new Date();
  const fechaHora = `${date.format('DD/MM/YYYY')} - ${now.toLocaleTimeString()}`;
  const totalGeneral = rows.reduce((acc, row) => acc + (row.total || 0), 0);
  const totalCitas = rows.reduce(
    (acc, row) => acc + (row.countAppointment || 0),
    0,
  );
  const promedioPorCita =
    totalCitas > 0 ? (totalGeneral / totalCitas).toFixed(2) : 0;

  const clinicName = companyInfo?.company_name || defaultClinicName;
  const logo = logoUrl || defaultLogo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <View style={styles.headerTitles}>
            <Text style={styles.clinicName}>{clinicName}</Text>
            <Text style={styles.reportTitle}>
              Reporte de Caja Diaria
              {isEdited && (
                <Text style={{ fontSize: 10, color: '#ff6b35', marginLeft: 8 }}>
                  (Datos Simulados)
                </Text>
              )}
            </Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.infoText}>
              Fecha del Reporte: {date.format('DD/MM/YYYY')}
            </Text>
            <Text style={styles.infoText}>Generado: {fechaHora}</Text>
            {isEdited && (
              <Text style={{ fontSize: 8, color: '#ff6b35', marginTop: 2 }}>
                * Datos modificados para simulación
              </Text>
            )}
          </View>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total de Citas</Text>
            <Text style={styles.summaryValue}>{totalCitas}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Promedio por Cita</Text>
            <Text style={styles.summaryValue}>S/ {promedioPorCita}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Ingreso Total</Text>
            <Text style={styles.summaryValue}>
              S/ {totalGeneral.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 2 }]}>Método de Pago</Text>
            <Text style={[styles.headerCell, { flex: 1, textAlign: 'center' }]}>
              Citas
            </Text>
            <Text style={[styles.headerCell, { flex: 1, textAlign: 'right' }]}>
              Monto
            </Text>
            <Text style={[styles.headerCell, { flex: 1, textAlign: 'right' }]}>
              Total
            </Text>
          </View>
          {rows.map((row, idx) => (
            <View
              style={[styles.tableRow, idx % 2 !== 0 ? styles.rowOdd : {}]}
              key={row.name}
            >
              <Text style={[styles.tableCell, styles.cellMethod]}>
                {row.name}
              </Text>
              <Text style={[styles.tableCell, styles.cellCount]}>
                {row.countAppointment}
              </Text>
              <Text style={[styles.tableCell, styles.cellAmount]}>
                S/ {row.payment.toFixed(2)}
              </Text>
              <Text style={[styles.tableCell, styles.cellAmount]}>
                S/ {row.total.toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles.tableFooter}>
            <Text style={styles.footerLabel}>Total General:</Text>
            <Text style={styles.footerValue}>S/ {totalGeneral.toFixed(2)}</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          {clinicName} - Documento generado automáticamente.
          {isEdited && (
            <Text style={{ color: '#ff6b35' }}>
              {' '}
              Datos modificados para simulación.
            </Text>
          )}
        </Text>
      </Page>
    </Document>
  );
};

export default React.memo(DailyCashReportPDF);
// Archivo de API para los componentes Select

// Función para obtener precios predeterminados
export const getPredeterminedPrices = async () => {
  // Simulación de llamada a API
  return [
    { value: 'consulta', label: 'Consulta', price: '150' },
    { value: 'terapia', label: 'Terapia', price: '200' },
    { value: 'evaluacion', label: 'Evaluación', price: '250' },
    { value: 'seguimiento', label: 'Seguimiento', price: '100' },
  ];
};

// Función para obtener diagnósticos
export const getDiagnoses = async () => {
  // Simulación de llamada a API
  return [
    { id: '1', name: 'Ansiedad' },
    { id: '2', name: 'Depresión' },
    { id: '3', name: 'Trastorno de estrés postraumático' },
    { id: '4', name: 'Trastorno obsesivo-compulsivo' },
    { id: '5', name: 'Trastorno bipolar' },
  ];
};

// Función para obtener países
export const getCountries = async () => {
  // Simulación de llamada a API
  return [
    { id: '1', name: 'Perú' },
    { id: '2', name: 'Colombia' },
    { id: '3', name: 'México' },
    { id: '4', name: 'Argentina' },
    { id: '5', name: 'Chile' },
    { id: '6', name: 'España' },
  ];
};

// Función para obtener departamentos/regiones
export const getDepartaments = async () => {
  // Simulación de llamada a API
  return [
    { id: '1', name: 'Lima' },
    { id: '2', name: 'Arequipa' },
    { id: '3', name: 'Cusco' },
    { id: '4', name: 'La Libertad' },
    { id: '5', name: 'Piura' },
  ];
};

// Función para obtener provincias
export const getProvinces = async (regionId) => {
  // Simulación de llamada a API con filtro por región
  const allProvinces = {
    '1': [
      { id: '101', name: 'Lima' },
      { id: '102', name: 'Barranca' },
      { id: '103', name: 'Cañete' },
    ],
    '2': [
      { id: '201', name: 'Arequipa' },
      { id: '202', name: 'Camaná' },
      { id: '203', name: 'Caravelí' },
    ],
    '3': [
      { id: '301', name: 'Cusco' },
      { id: '302', name: 'Calca' },
      { id: '303', name: 'Urubamba' },
    ],
    '4': [
      { id: '401', name: 'Trujillo' },
      { id: '402', name: 'Ascope' },
      { id: '403', name: 'Pacasmayo' },
    ],
    '5': [
      { id: '501', name: 'Piura' },
      { id: '502', name: 'Ayabaca' },
      { id: '503', name: 'Huancabamba' },
    ],
  };
  
  return allProvinces[regionId] || [];
};

// Función para obtener distritos
export const getDistricts = async (provinceId) => {
  // Simulación de llamada a API con filtro por provincia
  const allDistricts = {
    // Lima
    '101': [
      { id: '10101', name: 'Lima Cercado' },
      { id: '10102', name: 'Miraflores' },
      { id: '10103', name: 'San Isidro' },
      { id: '10104', name: 'Barranco' },
      { id: '10105', name: 'San Borja' },
    ],
    // Barranca
    '102': [
      { id: '10201', name: 'Barranca' },
      { id: '10202', name: 'Paramonga' },
      { id: '10203', name: 'Pativilca' },
    ],
    // Arequipa
    '201': [
      { id: '20101', name: 'Arequipa' },
      { id: '20102', name: 'Cayma' },
      { id: '20103', name: 'Cerro Colorado' },
      { id: '20104', name: 'Yanahuara' },
    ],
    // Cusco
    '301': [
      { id: '30101', name: 'Cusco' },
      { id: '30102', name: 'San Jerónimo' },
      { id: '30103', name: 'Santiago' },
      { id: '30104', name: 'Wanchaq' },
    ],
    // Trujillo
    '401': [
      { id: '40101', name: 'Trujillo' },
      { id: '40102', name: 'El Porvenir' },
      { id: '40103', name: 'Florencia de Mora' },
      { id: '40104', name: 'La Esperanza' },
    ],
    // Piura
    '501': [
      { id: '50101', name: 'Piura' },
      { id: '50102', name: 'Castilla' },
      { id: '50103', name: 'Catacaos' },
      { id: '50104', name: 'Tambo Grande' },
    ],
  };
  
  return allDistricts[provinceId] || [];
};
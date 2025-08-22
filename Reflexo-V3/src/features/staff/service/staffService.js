import {
  del,
  get,
  post,
  patch,
} from '../../../services/API/MethodsGeneral';
import { Staff } from '../../../mock/Staff';

export const createTherapist = async (data) => {
  try {
    const response = await post('therapists', data);
    return response.data;
  } catch (error) {
    console.error('Error en createTherapist:', error);
    throw error;
  }
};

export const getStaff = async (page = 1, perPage = 50) => {
  try {
    // Usar datos de prueba en lugar de llamada a API
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const data = Staff.slice(startIndex, endIndex);

    return {
      data,
      total: Staff.length,
    };
  } catch (error) {
    console.error('Error en getStaff:', error);
    throw error;
  }
};

export const searchStaff = async (term) => {
  try {
    if (!term || term.trim() === '') {
      return {
        data: Staff,
        total: Staff.length,
      };
    }

    const searchTerm = term.toLowerCase().trim();
    
    // Filtrar datos de prueba por término de búsqueda
    const filteredData = Staff.filter(staff => {
      // Búsqueda por DNI (número de documento)
      if (staff.document_number.includes(searchTerm)) {
        return true;
      }
      
      // Búsqueda por nombre completo
      if (staff.full_name.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      // Búsqueda por email
      if (staff.email.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      // Búsqueda por teléfono
      if (staff.phone.includes(searchTerm)) {
        return true;
      }
      
      // Búsqueda por especialidad
      if (staff.specialty.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      // Búsqueda avanzada: separar apellidos y nombres
      const fullNameParts = staff.full_name.toLowerCase().split(/[,\s]+/);
      const searchParts = searchTerm.split(/\s+/);
      
      // Verificar si todos los términos de búsqueda están en el nombre
      const allPartsFound = searchParts.every(part => 
        fullNameParts.some(namePart => namePart.includes(part))
      );
      
      if (allPartsFound) {
        return true;
      }
      
      return false;
    });
    
    return {
      data: filteredData,
      total: filteredData.length,
    };
  } catch (error) {
    console.error('Error en searchStaff:', error);
    throw error;
  }
};

export const deleteTherapist = async (therapistId) => {
  try {
    // Simular eliminación exitosa
    return {
      message: 'Terapeuta eliminado correctamente',
      success: true
    };
  } catch (error) {
    console.error('Error en deleteTherapist:', error);
    throw error;
  }
};

export const updateTherapist = async (therapistId, data) => {
  try {
    // Simular actualización exitosa
    return {
      message: 'Terapeuta actualizado correctamente',
      success: true,
      data: { ...data, id: therapistId }
    };
  } catch (error) {
    console.error('Error actualizando terapeuta:', error);
    throw error;
  }
};

export const getTherapistById = async (therapistId) => {
  try {
    // Buscar terapeuta por ID en los datos de prueba
    const therapist = Staff.find(staff => staff.id === therapistId);
    
    if (!therapist) {
      throw new Error('Terapeuta no encontrado');
    }
    
    return therapist;
  } catch (error) {
    console.error('Error obteniendo terapeuta por ID:', error);
    throw error;
  }
};

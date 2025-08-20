import { notification } from 'antd';
import FormGenerator from '../../../../components/Form/Form';
import { usePatients } from '../../hook/patientsHook';
import { useNavigate } from 'react-router';

const Fields = [
    /* Titulo principal */
    { type: 'title', label: 'Nuevo Paciente' },

    /* Primera Fila */
    {
        type: 'customRow',
        fields: [
            { name: 'documentType', label: 'Tipo de Documento', type: 'select', span: 8 },
            { name: 'documentNumber', label: 'N° Documento', type: 'text', required: true, span: 8 },
        ]
    },

    { name: 'fatherLastName', label: 'Apellido Paterno', type: 'text', required: true, span: 8 },
    { name: 'motherLastName', label: 'Apellido Materno', type: 'text', span: 8 },
    { name: 'name', label: 'Nombre', type: 'text', required: true, span: 8 },

    /* Tercera Fila */
    { name: 'birthDate', label: 'Fecha de Nacimiento', type: 'date', required: true, span: 8 },
    {
        name: 'sex', labe: 'Sexo', type: 'select',
        options: [
            { value: 'M', label: 'Masculino' },
            { value: 'F', label: 'Femenino' }
        ],
        span: 8, required: true
    },
    { name: 'occupation', label: 'Ocupación', type: 'text', span: 8 },

    /* Titulo */

    { type: 'tile', label: 'Informacion de Contacto' },

    /* Cuarta fila*/
    { name: 'primary_phone', label: 'Telefono', type: 'phoneNumber', required: true, span: 8 },
    { name: 'email', label: 'Correeo Electronico', type: 'text', span: 16 },

    /*Quinta fila*/
    { name: 'ubicacion', label: 'Ubicacion', type: 'ubigeo', span: 8 },
    { name: 'address', label: 'Dirección', type: 'text', span: 12, required: true }

];

const NewPatient = () => {
    return <FormGenerator fields={fields} />;
};

export default NewPatient;
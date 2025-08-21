import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import Tabla from "./Tabla.jsx"; 
import InfoPatient from "./InfoPatient.jsx";

const View = () => {
  const [pacientes, setPacientes] = useState([]);
  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  // Estado para InfoPatient
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    setPacientes([
      { id: 1, nombre: "Juan Pérez", edad: 30, email: "juan@mail.com" },
      { id: 2, nombre: "María López", edad: 25, email: "maria@mail.com" },
      { id: 3, nombre: "Carlos Ruiz", edad: 40, email: "carlos@mail.com" },
    ]);
  }, []);

  // --- Eliminar paciente ---
  const handleDeleteClick = (record) => {
    setToDelete(record);
    setOpen(true);
  };

  const eliminarPaciente = () => {
    if (!toDelete) return;
    setPacientes((prev) => prev.filter((p) => p.id !== toDelete.id));
    setOpen(false);
    setToDelete(null);
  };

  // --- Ver información del paciente ---
  const handleInfoClick = (record) => {
    setSelectedPatient(record);
    setInfoOpen(true);
  };

  const columns = [
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Edad", dataIndex: "edad", key: "edad" },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <>
          <Button 
            style={{ marginRight: 8 }} 
            onClick={() => handleInfoClick(record)}
          >
            Ver información
          </Button>
          <Button danger onClick={() => handleDeleteClick(record)}>
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Pacientes</h1>

      <Tabla
        columns={columns}
        data={pacientes}  
        pagination={false}
      />

      {/* Modal de confirmación para eliminar */}
      <Modal
        open={open}
        title={toDelete ? `¿Eliminar a ${toDelete.nombre}?` : "Confirmar"}
        onOk={eliminarPaciente}
        onCancel={() => { setOpen(false); setToDelete(null); }}
        okText="Sí, eliminar"
        cancelText="Cancelar"
        okButtonProps={{ danger: true }}
      >
        Esta acción no se puede deshacer.
      </Modal>

      {/* Modal de información del paciente */}
      <InfoPatient
        patient={selectedPatient}
        open={infoOpen}
        onClose={() => {
          setInfoOpen(false);
          setSelectedPatient(null);
        }}
      />
    </div>
  );
};

export default View;
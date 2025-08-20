import React, { useState, useEffect } from 'react';
import ModeloTable from './components/Table/pagination/Tabla';
import Found from './features/home/found';  // 👈 importa tu pantalla de inicio
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const generatedData = Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        name: `Item ${index + 1}`,
        description: `Descripción de item ${index + 1}`
      }));

      setData(generatedData);
      setPagination((prev) => ({
        ...prev,
        total: generatedData.length
      }));
      setLoading(false);
    }, 1000);
  }, []);

  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize
    }));
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Descripción', dataIndex: 'description', key: 'description' }
  ];

  return (
    <div className="App">
      {/* Pantalla de bienvenida */}
      <Found />

      {/* Tabla de ejemplo */}
      <h1>Tabla de Ejemplo</h1>
      <ModeloTable
        columns={columns}
        data={data}
        loading={loading}
        pagination={{
          ...pagination,
          onChange: handlePageChange
        }}
      />
    </div>
  );
}

export default App;

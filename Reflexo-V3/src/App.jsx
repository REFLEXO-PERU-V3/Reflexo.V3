import React from 'react';
import Calendario from './features/calendar/ui/Calendar.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={{ 
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
        padding: '20px',
        textAlign: 'center',
        borderBottom: '1px solid #2a2a2a'
      }}>
        <h1 style={{ 
          color: '#1CB54A', 
          margin: 0,
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          🗓️ Calendario - Vista de Prueba
        </h1>
        <p style={{ color: '#B4B4B8', margin: '10px 0 0 0' }}>
          Vista previa del calendario con el nuevo diseño
        </p>
      </header>
      
      <main style={{ height: 'calc(100vh - 120px)' }}>
        <Calendario />
      </main>
    </div>
  );
}

export default App;

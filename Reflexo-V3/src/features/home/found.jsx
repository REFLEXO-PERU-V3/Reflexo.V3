// src/features/home/found.jsx
import React from "react";
import styles from "./found.module.css";

const Found = () => {
  return (
    <div className={styles.container}>
      {/* Bienvenida */}
      <div className={styles.welcomeCard}>
        <h1>
          ¡Bienvenido a tu jornada, Fernando! <span className={styles.icon}>👋</span>
        </h1>
        <p>
          Todo lo que es verdadero, noble, justo, puro, amable, de buen nombre… en
          esto pensad. <span className={styles.quote}>- Filipenses 4:8</span>
        </p>
      </div>

      {/* Sección principal */}
      <div className={styles.grid}>
        {/* Accesos rápidos */}
        <div className={styles.card}>
          <h2>Accesos Rápidos</h2>
          <div className={styles.quickLinks}>
            <button className={styles.btn}>📊 Tabla de Pacientes</button>
            <button className={styles.btn}>📅 Tabla de Citas</button>
            <button className={styles.btn}>📄 Reportes</button>
            <button className={styles.btn}>👨‍⚕️ Tabla de Terapeutas</button>
          </div>
        </div>

        {/* Citas para hoy */}
        <div className={styles.card}>
          <h2>Citas para hoy</h2>
          <div className={styles.noAppointments}>
            <span className={styles.calendarIcon}>📆</span>
            <p>No hay citas para hoy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Found;

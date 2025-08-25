import React from "react";
import WelcomeBanner from "./homeComponents/WelcomeBanner";
import QuickAccess from "./homeComponents/QuickAccess";
import TodayAppointments from "./homeComponents/TodayAppointments";
import ThemeToggle from "./homeComponents/ThemeToggle";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      {/* Mensaje de bienvenida y botón arriba */}
      <div className={styles.welcome}>
        <WelcomeBanner />
        <ThemeToggle />
      </div>

      {/* Sección de dos columnas */}
      <div className={styles.dashboard}>
        <div className={styles.left}>
          <QuickAccess />
        </div>
        <div className={styles.right}>
          <TodayAppointments />
        </div>
      </div>
    </div>
  );
};

export default Home;

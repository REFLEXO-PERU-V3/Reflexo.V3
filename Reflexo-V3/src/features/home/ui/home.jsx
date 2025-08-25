import React from "react";
import styles from "./Home.module.css";
import QuickAccess from "./homeComponents/QuickAccess";
import TodayAppointments from "./homeComponents/TodayAppointments";
import WelcomeBanner from "./homeComponents/WelcomeBanner";

const Home = () => {
  return (
    <div className={styles.container}>
      {/* Mensaje de bienvenida */}
      <div className={styles.welcome}>
        <WelcomeBanner />
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

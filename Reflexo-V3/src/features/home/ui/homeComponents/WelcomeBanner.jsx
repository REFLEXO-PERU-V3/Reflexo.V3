import React from 'react';
import styles from './WelcomeBanner.module.css';
import { HandWaving } from '@phosphor-icons/react';

const WelcomeBanner = () => {
  return (
    <div className={styles.banner}>
      <h1 className={styles.title}>
        ¡Bienvenido a tu jornada!
        <HandWaving color="#00ff00" weight="fill" size={32} />
      </h1>
      <p className={styles.subtitle}>Aquí irá un mensaje de bienvenida</p>
    </div>
  );
};

export default WelcomeBanner;

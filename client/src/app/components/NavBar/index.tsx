import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.module.scss';
import {AuthRoutes} from "../../routes/routes-const";

const NavBar: React.FC = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>
        onlIinECinema
      </div>
      
      <div className={styles.authBlock}>
        <NavLink to={AuthRoutes.SIGN_IN}>Войти</NavLink>
      </div>
    </div>
  )
}

export default NavBar;
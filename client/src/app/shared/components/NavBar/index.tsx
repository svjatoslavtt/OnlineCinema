import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './style.module.scss';

import Button from "../Button";
import {AuthRoutes} from "../../../routes/routes-const";

const NavBar: React.FC = () => {
  const history = useHistory();

  const redirectToSignIn = () => history.push(AuthRoutes.SIGN_IN);

  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>
        onlinECinema
      </div>
      
      <Button onClick={redirectToSignIn} text="Войти" />
    </div>
  )
}

export default NavBar;
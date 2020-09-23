import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';

import styles from './style.module.scss';

import Button from "../Button";
import {AppRoutes, AuthRoutes} from "../../../routes/routes-const";
import {useDispatch, useSelector} from "react-redux";
import {getAuthToken} from "../../../redux/auth/selectors";
import {Actions} from "../../../redux/auth/action";

const NavBar: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(getAuthToken);

  const redirectToSignIn = () => {
    dispatch(Actions.clearErrors());
    history.push(AuthRoutes.SIGN_IN)
  };

  const redirectToMyOffice = () => history.push(AppRoutes.MY_OFFICE);

  const handlerLogout = () => dispatch(Actions.logout());
  
  return (
    <div className={styles.navBar}>
      <div className={styles.navBarHead}>
        <div className={styles.linkWrapper}>
          <div className={styles.logo}>
            onlinECinema
          </div>
        </div>

        {token ? (
          <div className={styles.buttonsWrapper}>
            <span onClick={redirectToMyOffice} className={styles.myOffice}>
              Мой кабинет
            </span>

            <span onClick={handlerLogout} className={styles.logout}>
              Выйти
            </span>
          </div>
        ) : (
          <div onClick={redirectToSignIn} className={styles.myOffice}>Войти в систему</div>
        )}
      </div>

      <div className={styles.navBarPages}>
        <NavLink to={AppRoutes.NEWS_FEED} className={styles.pageLink} activeClassName={styles.linkActive}>Фильмы</NavLink>
        <NavLink to={AppRoutes.MY_OFFICE} className={styles.pageLink} activeClassName={styles.linkActive}>Категории</NavLink>
      </div>
    </div>
  )
}

export default NavBar;
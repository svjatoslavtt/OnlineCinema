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

  const redirectToSignIn = () => history.push(AuthRoutes.SIGN_IN);

  const redirectToMyOffice = () => history.push(AppRoutes.MY_OFFICE);

  const handlerLogout = () => {
    dispatch(Actions.logout());
  }

  return (
    <div className={styles.navBar}>
      <div className={styles.linkWrapper}>
        <div className={styles.logo}>
          onlinECinema
        </div>

        <div className={styles.toFilmsLink}>
          <NavLink to={AppRoutes.NEWS_FEED}>фильмы</NavLink>
        </div>
      </div>

      {token ? (
        <div className={styles.buttonsWrapper}>
          <Button onClick={redirectToMyOffice} text={'Мой кабинет'}/>
          /
          <Button onClick={handlerLogout} text={'Выйти'}/>
        </div>
      ) : (
        <Button onClick={redirectToSignIn} text={'Войти в систему'}/>
      )}
    </div>
  )
}

export default NavBar;
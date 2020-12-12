import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import styles from './style.module.scss';

import {AppRoutes, AuthRoutes} from "../../../routes/routes-const";
import {getAuthToken} from "../../../redux/auth/selectors";
import {Actions} from "../../../redux/auth/actions";

const NavBar: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(getAuthToken);
  const getUser = localStorage.getItem('user');
	const user = getUser && JSON.parse(getUser);

  const redirectToSignIn = () => {
    dispatch(Actions.clearErrors());
    history.push(AuthRoutes.SIGN_IN)
  };

	const handlerLogout = () => dispatch(Actions.logout());
  
  return (
    <header className={styles.navBar}>
      <div className={styles.navBarHead}>
        <div className={styles.linkWrapper}>
          <div className={styles.logo}>
            <NavLink to={AppRoutes.NEWS_FEED}>BooksStock</NavLink>
          </div>
        </div>

        {token ? (
          <div className={styles.buttonsWrapper}>
            {user && <span className={styles.user}>{user.name}</span>}

            <button onClick={handlerLogout} className={styles.logout}>
              Выйти
            </button>
          </div>
        ) : (
          <button onClick={redirectToSignIn} className={styles.myOffice}>
						Войти
					</button>
        )}
      </div>

      <nav className={styles.navBarPages}>
        <NavLink to={AppRoutes.NEWS_FEED} className={styles.pageLink} activeClassName={styles.linkActive}>Главная</NavLink>
				{token && (<NavLink to={AppRoutes.MY_OFFICE} className={styles.pageLink} activeClassName={styles.linkActive}>Мой кабинет</NavLink>)}
      </nav>
    </header>
  )
}

export default NavBar;
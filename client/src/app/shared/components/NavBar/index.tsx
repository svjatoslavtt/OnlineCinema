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

	// const handlerOpenFilter = () => dispatch(FilterActions.openFilter());
  
  return (
    <div className={styles.navBar}>
      <div className={styles.navBarHead}>
        <div className={styles.linkWrapper}>
          <div className={styles.logo}>
            <NavLink to={AppRoutes.NEWS_FEED}>Moviestock</NavLink>
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

      <div className={styles.navBarPages}>
        <NavLink to={AppRoutes.NEWS_FEED} className={styles.pageLink} activeClassName={styles.linkActive}>Фильмы</NavLink>
				{token && (<NavLink to={AppRoutes.MY_OFFICE} className={styles.pageLink} activeClassName={styles.linkActive}>Мой кабинет</NavLink>)}
				{/* <div className={styles.navFilter} onClick={handlerOpenFilter}>Фильтр</div> */}
      </div>
    </div>
  )
}

export default NavBar;
import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import styles from './style.module.scss';

import { Profile } from '../../svg/Profile';

import {AppRoutes, AuthRoutes} from "../../../routes/routes-const";
import {getAuthToken} from "../../../redux/auth/selectors";
import {Actions} from "../../../redux/auth/actions";
import { Cart } from '../../svg/Cart';

const NavBar: React.FC = () => {
  // const history = useHistory();
  // const dispatch = useDispatch();
  const token = useSelector(getAuthToken);
  // const getUser = localStorage.getItem('user');
	// const user = getUser && JSON.parse(getUser);

  // const redirectToSignIn = () => {
  //   dispatch(Actions.clearErrors());
  //   history.push(AuthRoutes.SIGN_IN)
  // };

	// const handlerLogout = () => dispatch(Actions.logout());
  
  return (
    <header className={styles.container}>
			<div className={styles.headerLogo}>
				<NavLink to={AppRoutes.NEWS_FEED}>BooksStock</NavLink>
			</div>

			<nav className={styles.navbarPages}>
				<div className={styles.navbarLinksWrapper}>
					<NavLink to={AppRoutes.NEWS_FEED} className={styles.pageLink} activeClassName={styles.linkActive}>Home</NavLink>
					{token && (<NavLink to={AppRoutes.MY_OFFICE} className={styles.pageLink} activeClassName={styles.linkActive}>My office</NavLink>)}
				</div>
			
				<div className={styles.navbarOwnData}>
					<Profile />

					<div className={styles.cartWrapper}>
						<div className={styles.badge}>1</div>
						<Cart />
						<span>0.00$</span>
					</div>
				</div>
			</nav>
    </header>
  )
}

export default NavBar;
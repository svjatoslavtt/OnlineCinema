import React, { useEffect, useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import styles from './style.module.scss';
import NavBarMobile from './mobile';

import { Profile } from '../../svg/Profile';

import {AppRoutes, AuthRoutes} from "../../../routes/routes-const";
import {getAuthToken} from "../../../redux/auth/selectors";
import {Actions} from "../../../redux/auth/actions";
import { Cart } from '../../svg/Cart';

const Header: React.FC = () => {
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
	const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
	
	const isMedia = useMediaQuery('(max-width: 1000px)');

	useEffect(() => {
		const body: any = document.querySelector("body");

		if (isOpenMobile && body) {
			body.style.overflowY = "hidden";
		} else if (body) {
			body.style.overflowY = "auto";
		}
	}, [isOpenMobile]);
  
  return (
    <header className={styles.container}>
			<div className={styles.topHeaderWrapper}>
				<div className={styles.headerLogo}>
					<NavLink to={AppRoutes.NEWS_FEED}>BooksStock</NavLink>
				</div>

				{isMedia && (
					<>
						<div className={styles.menu} onClick={setIsOpenMobile.bind(null, true)}>
							<i className="fas fa-bars"></i>
						</div>

						<NavBarMobile isOpenMobile={isOpenMobile} setIsOpenMobile={setIsOpenMobile} />
					</>
				)}
			</div>

			<nav className={styles.navbarPages}>
				<div className={styles.navbarLinksWrapper}>
					<NavLink to={'/'} exact={true} className={styles.pageLink} activeClassName={styles.linkActive}>Главная</NavLink>
					<NavLink to={AppRoutes.Catalog + '/all'} className={styles.pageLink} activeClassName={styles.linkActive}>Книги</NavLink>
					<NavLink to={AppRoutes.Catalog + '/authors'} className={styles.pageLink} activeClassName={styles.linkActive}>Авторы</NavLink>
					<NavLink to={AppRoutes.BOOK_DETAILED + '/123'} className={styles.pageLink} activeClassName={styles.linkActive}>Детально_Тест</NavLink>
				</div>
			
				<div className={styles.navbarOwnData}>
					{token ? (
						<NavLink to={AppRoutes.MY_OFFICE}>
							<Profile />
						</NavLink>
					) : (
						<div className={styles.authLinks}>
							<NavLink to={AuthRoutes.SIGN_IN}>Войти</NavLink>
							<NavLink to={AuthRoutes.SIGN_UP}>Регистрация</NavLink>
						</div>
					)}
				

					<div className={styles.cartWrapper}>
						<div className={styles.badge}>0</div>
						<NavLink to={AppRoutes.CART}><Cart /></NavLink>
						<span>0.00$</span>
					</div>
				</div>
			</nav>

			{isMedia && (
				<nav className={styles.navbarOwnData}>
					{token ? (
						<NavLink to={AppRoutes.MY_OFFICE} className={styles.pageLink} activeClassName={styles.linkActive}>
							Мой кабинет
						</NavLink>
					) : (
						<div className={styles.authLinks}>
							<NavLink to={AuthRoutes.SIGN_IN}>Войти</NavLink>
							<NavLink to={AuthRoutes.SIGN_UP}>Регистрация</NavLink>
						</div>
					)}
				

					<div className={styles.cartWrapper}>
						<div className={styles.badge}>0</div>
						<NavLink to={AppRoutes.CART} className={styles.cart}><Cart /></NavLink>
						<span>0.00$</span>
					</div>
				</nav>
			)}
    </header>
  )
}

export default Header;
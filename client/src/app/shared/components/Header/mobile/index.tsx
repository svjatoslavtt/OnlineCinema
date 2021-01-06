import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './style.module.scss';

import { Cart } from '../../../svg/Cart';
import { Profile } from '../../../svg/Profile';

import { AppRoutes, AuthRoutes } from '../../../../routes/routes-const';
import { getAuthToken } from '../../../../redux/auth/selectors';

type NavBarMobileTypes = {
	isOpenMobile: boolean;
	setIsOpenMobile: (isOpen: boolean) => void;
};

const NavBarMobile: React.FC<NavBarMobileTypes> = ({ isOpenMobile, setIsOpenMobile }) => {
	const token = useSelector(getAuthToken);

	const navBarStyles = [
		styles.navBarMobile,
		isOpenMobile ? styles.mobileOpen : styles.mobileClose
	];
	
	return (
		<header className={navBarStyles.join(' ')}>
			<div className={styles.loyout} onClick={setIsOpenMobile.bind(null, false)}></div>
			<nav className={styles.links}>
				<div className={styles.closeButton} onClick={setIsOpenMobile.bind(null, false)}>
					<i className="fas fa-times"></i>
				</div>

				<div className={styles.navbarLinksWrapper}>
					<NavLink to={'/'} exact={true} className={styles.pageLink} activeClassName={styles.linkActive}>Главная</NavLink>
					<NavLink to={AppRoutes.Catalog + '/all'} className={styles.pageLink} activeClassName={styles.linkActive}>Книги</NavLink>
					<NavLink to={AppRoutes.Catalog + '/authors'} className={styles.pageLink} activeClassName={styles.linkActive}>Авторы</NavLink>
					<NavLink to={AppRoutes.BOOK_DETAILED + '/123'} className={styles.pageLink} activeClassName={styles.linkActive}>Детально_Тест</NavLink>
				</div>
			</nav>
		</header>
	);
};

export default NavBarMobile;


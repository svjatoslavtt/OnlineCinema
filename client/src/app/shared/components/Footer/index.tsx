import React from 'react';
import { NavLink } from 'react-router-dom';
import { AuthRoutes } from '../../../routes/routes-const';

import styles from './style.module.scss';

const Footer: React.FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerContainer}>
				<div className={styles.footerList}>
					<div className={styles.logo}>
						<NavLink to='/'>
							BookStock
						</NavLink>
					</div>
					<div className={styles.adress}>
						<i className="fas fa-map-marked-alt"></i>
						59 Street, Newyork City, Rose Town, 05 Rive House
					</div>
					<div className={styles.phoneNumber}>
						<i className="fas fa-phone-volume"></i>
						+123 456 7890
					</div>
					<div className={styles.email}>
						<i className="fas fa-envelope"></i>
						info@example.com
					</div>
				</div>

				<div className={styles.footerList}>
					<div className={styles.listTitle}>Products</div>
					<div className={styles.listElement}>
						<NavLink to='/'>
							Most popular books
						</NavLink>
					</div>
					<div className={styles.listElement}>
						<NavLink to='/'>
							Most sales books
						</NavLink>
					</div>
					<div className={styles.listElement}>
						<NavLink to='/'>
							Books sale
						</NavLink>		
					</div>
				</div>

				<div className={styles.footerList}>
					<div className={styles.listTitle}>Information</div>
					<div className={styles.listElement}>
						<NavLink to='/'>
							Information
						</NavLink>
					</div>
					<div className={styles.listElement}>
						<NavLink to='/'>
							About us
						</NavLink>
					</div>
				</div>

				<div className={styles.footerList}>
					<div className={styles.listTitle}>My account</div>
					<div className={styles.listElement}>
						<NavLink to='/'>
							My account
						</NavLink>
					</div>
					<div className={styles.listElement}>
						<NavLink to={AuthRoutes.SIGN_IN}>
							Login
						</NavLink>
					</div>
					<div className={styles.listElement}>
						<NavLink to={AuthRoutes.SIGN_UP}>
							Register
						</NavLink>
					</div>
				</div>
			</div>

			<div className={styles.footerLine}></div>

			<div className={styles.footerSubelement}>
				<div className={styles.copyright}>
					© Copyright Metro 2020.
				</div>

				<div className={styles.socialNetworks}>
					<i className="fab fa-facebook-f"></i>
					<i className="fab fa-twitter"></i>
					<i className="fab fa-linkedin-in"></i>
					<i className="fab fa-youtube"></i>
					<i className="fab fa-pinterest"></i>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
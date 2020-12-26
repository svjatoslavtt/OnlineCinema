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
							BooksStock
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
						books@stock.com
					</div>
				</div>

				<div className={styles.footerList}>
					<div className={styles.listTitle}>Книги</div>
					<div className={styles.listElement}>
						<NavLink to='/'>
							Самые популярные книги
						</NavLink>
					</div>
					<div className={styles.listElement}>
						<NavLink to='/'>
							Самые продаваемые книги
						</NavLink>
					</div>
					<div className={styles.listElement}>
						<NavLink to='/'>
							Распродажа книг
						</NavLink>		
					</div>
				</div>

				<div className={styles.footerList}>
					<div className={styles.listTitle}>Информация</div>
					<div className={styles.listElement}>
						<NavLink to='/'>
							О нас
						</NavLink>
					</div>
					<div className={styles.listElement}>
						<NavLink to='/'>
							Контакты
						</NavLink>
					</div>
				</div>

				<div className={styles.footerList}>
					<div className={styles.listTitle}>Мой аккаунт</div>
					<div className={styles.listElement}>
						<NavLink to='/'>
							Мой кабинет
						</NavLink>
					</div>
					<div className={styles.listElement}>
						<NavLink to={AuthRoutes.SIGN_IN}>
							Войти
						</NavLink>
					</div>
					<div className={styles.listElement}>
						<NavLink to={AuthRoutes.SIGN_UP}>
							Регистрация
						</NavLink>
					</div>
				</div>
			</div>

			<div className={styles.footerLine}></div>

			<div className={styles.footerSubelement}>
				<div className={styles.copyright}>
					© Copyright BookStock 2020.
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
import React, { useEffect } from 'react';

import styles from './style.module.scss';

import { BOOKS } from '../Home/data/books-data';

import Banner from '../../shared/components/Banner';
import Footer from '../../shared/components/Footer';
import Header from '../../shared/components/Header';
import Products, { ProductDisplayTypeEnum } from '../../shared/components/Products';
import AdditionalBooks from '../../shared/components/AdditionalBooks';
import { NavLink } from 'react-router-dom';
import { AppRoutes } from '../../routes/routes-const';
import { useDispatch, useSelector } from 'react-redux';
import { Actions as AuthActions } from '../../redux/auth/actions';
import { Actions as BookActions } from '../../redux/books/action';
import { getBooks } from '../../redux/books/selectors';

const MyOffice: React.FC = () => {
	const dispatch = useDispatch();
	const books = useSelector(getBooks);

	useEffect(() => {
		dispatch(BookActions.getBooksRequest());
	}, []);

	const handlerLogout = () => {
		dispatch(AuthActions.logout());
	};

	return (
		<>
			<Header />
			<Banner title="Мой кабинет" />
			
			<main className={styles.myOffice}>
				<section className={styles.section}>
					<div className={styles.title}>
						<span>Мои данные</span>
					</div>

					<div className={styles.data}>
						<span>Василий Васильевич</span>
						<span>vasiliiy_vasilevich@gmail.com</span>
						<div className={styles.actionButton}>Изменить пароль</div>
						<NavLink to={AppRoutes.UPLOAD_BOOK}>
							<div className={styles.actionButton}>Загрузить книгу (только админ)</div>
						</NavLink>
						<div className={styles.logout} onClick={handlerLogout}>Выйти</div>
					</div>
				</section>

				<section className={styles.section}>
					<div className={styles.title}>
						<span>Сохранённые книги</span>
					</div>

					<div className={styles.products}>
						<Products data={books} />
					</div>
				</section>
			</main>

			<AdditionalBooks count={0} data={books} title='Похожие на книги которые Вам понравились' />

			<Footer />
		</>
	);
};

export default MyOffice;
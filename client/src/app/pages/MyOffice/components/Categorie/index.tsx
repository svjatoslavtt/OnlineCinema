import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './style.module.scss';

import Film from '../../../NewsFeed/components/Film.tsx';
import { AppRoutes } from '../../../../routes/routes-const';

interface CategorieProps {
	title: string;
}

const Categorie: React.FC<CategorieProps> = ({ title }) => {
	return (
		<div className={styles.categorie}>
			<div className={styles.categorieHeaderWrapper}>
				<span className={styles.categorieTitle}>{title}</span>

				{title === 'Мои фильмы' && (
					<NavLink to={AppRoutes.UPLOAD_FILM} className={styles.categorieAddNewFilm}>
						Загрузить новый фильм
					</NavLink>
				)}
			</div>

			<div className={styles.categorieFilmsWrapper}>
				<Film />
			</div>
		</div>
	)
}

export default Categorie;
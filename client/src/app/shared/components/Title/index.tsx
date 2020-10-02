import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import styles from './style.module.scss';

import { AppRoutes } from '../../../routes/routes-const';
import GoBackArrow from '../Icons/GoBackArrow';

enum CategorieParams {
	MY_FILM = 'Мои фильмы',
};

type TitleTypes = {
	title: string;
	goBack?: boolean;
};

const Title: React.FC<TitleTypes> = ({ title, goBack}) => {

	return (
		<div className={styles.categorieHeaderWrapper}>
				{goBack && (
						<GoBackArrow />
					)
				}
				<span className={styles.categorieTitle}>{title}</span>

				{title === CategorieParams.MY_FILM && (
					<NavLink to={AppRoutes.UPLOAD_FILM} className={styles.categorieAddNewFilm}>
						Загрузить новый фильм
					</NavLink>
				)}
			</div>
	);
};

export default Title;
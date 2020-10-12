import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

import styles from './style.module.scss';

import { AppRoutes } from '../../../routes/routes-const';
import GoBackArrow from '../Icons/GoBackArrow';
import LikeSvg from '../Icons/Likes/Like';
import { useSelector } from 'react-redux';
import { getUserProfileData } from '../../../redux/user-profile/selectors';

type TitleTypes = {
	title: string;
	goBack?: boolean;
	uploadFilm?: boolean;
	heartSvg?: boolean;
};

const Title: React.FC<TitleTypes> = ({ title, goBack, heartSvg, uploadFilm }) => {
	const params: { userId: string } = useParams();
	const user: { name: string, id: string } | null = useSelector(getUserProfileData);

	return (
		<div className={styles.categorieHeaderWrapper}>
			{goBack && (
				<GoBackArrow />
			)}

			<span className={styles.categorieTitle}>
				{user && params.userId && !heartSvg && <span className={styles.userName}>{user.name}</span>}
				{title}
				{heartSvg && (
					<LikeSvg />
				)}
			</span>

			{uploadFilm && (
				<NavLink to={AppRoutes.UPLOAD_FILM} className={styles.categorieAddNewFilm}>
					Загрузить новый фильм
				</NavLink>
			)}
			</div>
	);
};

export default Title;
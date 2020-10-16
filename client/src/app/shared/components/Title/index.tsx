import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './style.module.scss';

import GoBackArrow from '../Icons/GoBackArrow';
import LikeSvg from '../Icons/Likes/Like';

import { AppRoutes } from '../../../routes/routes-const';
import { getUserProfileData } from '../../../redux/user-profile/selectors';
import {Actions as FilterActions} from "../../../redux/filter/actions";

type TitleTypes = {
	title: string;
	goBack?: boolean;
	uploadFilm?: boolean;
	heartSvg?: boolean;
	newsFeed?: boolean;
};

const Title: React.FC<TitleTypes> = ({ title, goBack, heartSvg, uploadFilm, newsFeed }) => {
	const dispatch = useDispatch();
	const params: { userId: string } = useParams();
	const user: { name: string, id: string } | null = useSelector(getUserProfileData);

	const handlerOpenFilter = () => dispatch(FilterActions.openFilter());

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
				<NavLink to={AppRoutes.UPLOAD_FILM} className={styles.categorieTitleTag}>
					Загрузить новый фильм
				</NavLink>
			)}

			{newsFeed && (
				<div className={styles.categorieTitleTag} onClick={handlerOpenFilter}>Фильтр</div>
			)}
			</div>
	);
};

export default Title;
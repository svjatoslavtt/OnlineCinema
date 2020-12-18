import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddIcon from '@material-ui/icons/Add';

import styles from './style.module.scss';

import { AppRoutes } from '../../../routes/routes-const';
import { getUserProfileData } from '../../../redux/user-profile/selectors';
import {Actions as FilterActions} from "../../../redux/filter/actions";

type TitleTypes = {
	title: string;
	goBack?: boolean;
	uploadBook?: boolean;
	heartSvg?: boolean;
	newsFeed?: boolean;
};

const Title: React.FC<TitleTypes> = ({ title, goBack, heartSvg, uploadBook, newsFeed }) => {
	const dispatch = useDispatch();
	const params: { userId: string } = useParams();
	const user: { name: string, id: string } | null = useSelector(getUserProfileData);

	const isMobile = useMediaQuery('(max-width: 500px)');

	const handlerOpenFilter = () => dispatch(FilterActions.openFilter());

	return (
		<div className={styles.categorieHeaderWrapper}>
			<span className={styles.categorieTitle}>
				{user && params.userId && !heartSvg && <span className={styles.userName}>{isMobile ? user.name.length <= 9 ? user.name : user.name.substring(0, 9) + '...' : user.name}</span>}
				{isMobile ? title.split(' ')[0] : title}
			</span>

			{uploadBook && (
				<NavLink to={AppRoutes.UPLOAD_BOOK} className={`${styles.categorieTitleTag} ${styles.mobile}`}>
					{isMobile ? <AddIcon /> : 'Загрузить новую книгу'}
				</NavLink>
			)}

			{newsFeed && (
				<div className={styles.categorieTitleTag} onClick={handlerOpenFilter}>Фильтр</div>
			)}
			</div>
	);
};

export default Title;
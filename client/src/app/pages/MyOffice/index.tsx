import React, { useEffect } from 'react';

import styles from './style.module.scss';
import Categorie from '../../shared/components/Categorie';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../redux/films/action';
import { getMyFilms, getMyLikes } from '../../redux/films/selectors';

const MyOffice: React.FC = () => {
	const dispatch = useDispatch();
	const MyOwnfilms = useSelector(getMyFilms);
	const myLikesFilms = useSelector(getMyLikes);

	useEffect(() => {
		dispatch(Actions.getMyFilmsRequest());
		dispatch(Actions.getMyLikesRequest());
	}, [dispatch]);

	return (
		<div className={styles.myOfficeContainer}>
			<Categorie title='Загруженные фильмы' data={MyOwnfilms} />
			<Categorie title='Мои лайки' data={myLikesFilms} />
		</div>
	)
}

export default MyOffice;
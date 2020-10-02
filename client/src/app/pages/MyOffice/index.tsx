import React, { useEffect } from 'react';

import styles from './style.module.scss';
import Categorie from '../../shared/components/Categorie';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../redux/get-films/action';
import { getMyFilms } from '../../redux/get-films/selectors';

const MyOffice: React.FC = () => {
	const dispatch = useDispatch();
	const films = useSelector(getMyFilms);

	useEffect(() => {
		dispatch(Actions.getMyFilmsRequest());
		dispatch(Actions.getMyLikesRequest());
	}, [dispatch]);

	return (
		<div className={styles.myOfficeContainer}>
			<Categorie title='Мои фильмы' data={films} />
			<Categorie title='Мои лайки' />
		</div>
	)
}

export default MyOffice;
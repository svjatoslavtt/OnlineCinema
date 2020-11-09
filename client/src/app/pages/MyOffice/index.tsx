import React, { useEffect } from 'react';

import styles from './style.module.scss';
import Categorie from '../../shared/components/Categorie';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../redux/books/action';
import { getMyFilms, getMyLikes } from '../../redux/books/selectors';

const MyOffice: React.FC = () => {
	const dispatch = useDispatch();
	const myOwnFilms = useSelector(getMyFilms);
	const myLikesFilms = useSelector(getMyLikes);

	useEffect(() => {
		dispatch(Actions.getMyBooksRequest());
		dispatch(Actions.getMyLikesRequest());
	}, [dispatch]);

	return (
		<div className={styles.myOfficeContainer}>
			<Categorie title='Загруженные книги' uploadFilm={true} data={myOwnFilms} />
			<Categorie title='Мои лайки' heartSvg={true} data={myLikesFilms} />
		</div>
	)
}

export default MyOffice;
import React, { useEffect } from 'react';

import styles from './style.module.scss';
import Categorie from '../../shared/components/Categorie';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../redux/books/action';
import { getMyBooks, getMyLikes } from '../../redux/books/selectors';
import NavBar from '../../shared/components/NavBar';

const MyOffice: React.FC = () => {
	const dispatch = useDispatch();
	const myOwnBooks = useSelector(getMyBooks);
	const myLikesBooks = useSelector(getMyLikes);

	useEffect(() => {
		dispatch(Actions.getMyBooksRequest());
		dispatch(Actions.getMyLikesRequest());
	}, [dispatch]);

	return (
		<>
			<NavBar />
			<div className={styles.myOfficeContainer}>
				<Categorie title='Загруженные книги' uploadBook={true} data={myOwnBooks} />
				<Categorie title='Мои лайки' heartSvg={true} data={myLikesBooks} />
			</div>
		</>
	)
}

export default MyOffice;
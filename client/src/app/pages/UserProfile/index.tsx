import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './style.module.scss';

import Categorie from '../../shared/components/Categorie';
import { getUserProfileData, getUserProfileFilms, getUserProfileLikes } from '../../redux/user-profile/selectors';
import { Actions } from '../../redux/user-profile/actions';
import NavBar from '../../shared/components/NavBar';

const UserProfile: React.FC = () => {
	const dispatch = useDispatch();
	const { userId }: { userId: string } = useParams();
	const userFilms = useSelector(getUserProfileFilms);
	const userLikes = useSelector(getUserProfileLikes);
	const user = useSelector(getUserProfileData);

	useEffect(() => {
		if (user?.id !== userId) {
			dispatch(Actions.getUserProfileFilmsRequest(userId));
			dispatch(Actions.getUserProfileLikesRequest(userId));
		}
	}, [dispatch, userId, user]);

	return (
		<>
			<NavBar />
			<div className={styles.myOfficeContainer}>
				<Categorie title='Загруженные книги' goBack={true} data={userFilms} />
				<Categorie title='Лайки' heartSvg={true} data={userLikes} />
			</div>
		</>
	)
}

export default UserProfile;
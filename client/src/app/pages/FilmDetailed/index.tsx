import Rating from '@material-ui/lab/Rating';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import styles from './style.module.scss';

import { Actions } from '../../redux/films/action';
import { getCurrentFilm, getIsLikeFilm } from '../../redux/films/selectors';
import Title from '../../shared/components/Title';
import Likes from '../../shared/components/Icons/Likes';
import { getLoading } from '../../redux/loading/selectors';
import { getAuthToken } from '../../redux/auth/selectors';


const FilmDetailed: React.FC = () => {
	const [error, setError] = useState('');
	const [rating, setRating] = useState<number | null>(0);
	const { filmId }: { filmId: string } = useParams();
	const dispatch = useDispatch();
	const currentFilm = useSelector(getCurrentFilm);
	const loading = useSelector(getLoading);
	const isLike = useSelector(getIsLikeFilm);
	const token = useSelector(getAuthToken);

	useEffect(() => {
		if (currentFilm) {
			setRating(currentFilm.rating);
		}
		
	}, [currentFilm]);

	useEffect(() => {
		dispatch(Actions.getCurrentFilmRequest({filmId}));
	}, [dispatch, filmId, token]);

	const handlerFilmLike = useCallback(
		_.debounce(
			() => {
				if (token) {
					if (isLike) {
						dispatch(Actions.dislikeFilmRequest({filmId, token}));
					} else {
						dispatch(Actions.likeFilmRequest({filmId, token}));
					}
				} else {
					setError('Нужно авторизоваться!');
				}
			}, 
			500, 
			{
				leading: true,
				trailing: false,
			}
	), [isLike, token]);

	return (
		<div className={styles.container}>
			<Title title='Подробнее' goBack={true} />

			{!loading && (
				<div className={styles.contentWrapper}>
					<div className={styles.imageBlock}>
						<div className={styles.imageWrapper}>
							<img src={currentFilm?.image} alt={currentFilm?.title} />
						</div>
					</div>
					<div className={styles.infoBlock}>
						<div className={styles.title}>{currentFilm?.title}</div>
						<div className={styles.description}>{currentFilm?.description}</div>
						<div className={styles.rating}>
							<Rating
								name='simple-controlled'
								value={rating}
								onChange={(_, newValue) => {
									setRating(newValue);
								}}
							/>
						</div>
						<div className={styles.likesBlock}>
							<Likes onClick={handlerFilmLike} />
							<span className={styles.likes}>{currentFilm?.likes}</span>
						</div>

						{error && (
							<div className={styles.error}>{error}</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default FilmDetailed;
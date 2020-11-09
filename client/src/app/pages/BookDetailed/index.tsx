import Rating from '@material-ui/lab/Rating';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import _ from 'lodash';
import EditIcon from '@material-ui/icons/Edit';

import styles from './style.module.scss';

import { Actions } from '../../redux/books/action';
import { getCurrentFilm, getIsLikeFilm, getIsRatedFilm } from '../../redux/books/selectors';
import Title from '../../shared/components/Title';
import Likes from '../../shared/components/Icons/Likes';
import { getLoading } from '../../redux/loading/selectors';
import { getAuthToken } from '../../redux/auth/selectors';
import { AppRoutes } from '../../routes/routes-const';

const FilmDetailed: React.FC = () => {
	const history = useHistory();
	const [error, setError] = useState('');
	const [ratingHoverValue, setRatingHoverValue] = useState<number | null>(0);
	const { filmId }: { filmId: string } = useParams();
	const dispatch = useDispatch();
	const currentFilm = useSelector(getCurrentFilm);
	const loading = useSelector(getLoading);
	const isLike = useSelector(getIsLikeFilm);
	const isRate = useSelector(getIsRatedFilm);
	const token = useSelector(getAuthToken);

	useEffect(() => {
		dispatch(Actions.getCurrentBookRequest({ filmId }));
	}, [dispatch, filmId]);

	const handlerChangeRating = useCallback(
		_.debounce(
			(_: React.ChangeEvent<{}>, newValue: number | null) => {
				if (token) {
					dispatch(Actions.rateBookRequest({ filmId, rating: newValue, token }));
				}
			}, 
			500, 
			{
				leading: true,
				trailing: false,
			}
			
	), [isLike, token]);

	const handlerSetRating = () => !token && setError('Нужно авторизоваться!');

	const handlerFilmLike = useCallback(
		_.debounce(
			() => {
				if (token) {
					if (isLike) {
						dispatch(Actions.dislikeBookRequest({ filmId, token }));
					} else {
						dispatch(Actions.likeBookRequest({ filmId, token }));
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

	const isOwner = currentFilm?.owner.id === JSON.parse(localStorage.getItem('id') as string);

	const handlerEditFilm = () => {
		history.push(AppRoutes.EDIT_BOOK + '/' + filmId);
	};

	return (
		<div className={styles.filmDetailed}>
			<Title title='Подробнее' goBack={true} />

			<div className={styles.contentWrapper}>
				<div className={styles.imageBlock}>
					<div className={styles.imageWrapper}>
						{!loading && (
							<img src={currentFilm?.image} alt={currentFilm?.title} />
						)}
						{isOwner && (
							<div className={styles.editFilm} onClick={handlerEditFilm}>
								<EditIcon />
							</div>
						)}
					</div>
				</div>
				<div className={styles.infoBlock}>
					{!loading && (
						<div>
							<div className={styles.title}>{currentFilm?.title}</div>
							<div className={styles.description}>{currentFilm?.description}</div>
							<div className={styles.director}>{`Режисёр: ${currentFilm?.director}`}</div>
							<div className={styles.rating}>
								<span className={styles.ratingCounter}>
									{`Рейтинг фильма: ${currentFilm?.averageRating}`}
									<span className={styles.peopleRated}>{`(голосов: ${currentFilm?.peopleRated})`}</span>
								</span>
								<div onClick={handlerSetRating}>	
									{
										isRate || !token ? (
											<Rating
												name='read-only'
												value={currentFilm?.averageRating ?? 5}
												precision={0.1}
												readOnly
											/>
										) : (
											<Rating
												name='simple-controlled'
												value={currentFilm?.averageRating ?? 5}
												onChangeActive={(_, value) => {
													setRatingHoverValue(value);
												}}
												precision={0.1}
												onChange={handlerChangeRating}
											/>
										)
									}
									{(ratingHoverValue !== 0 && !isRate && ratingHoverValue !== -1) && (
										<span>{ratingHoverValue}</span>
									)}
								</div>
							</div>

							<div className={styles.likesBlock}>
								<Likes onClick={handlerFilmLike} />
								<span className={styles.likes}>{currentFilm?.likes}</span>
							</div>

							{error && (
								<div className={styles.error}>{error}</div>
							)}
						</div>
					)}
					
					{!loading && (
						<div className={styles.authorWrapper}>
							<div className={styles.author}>
								<span>Автор: </span>
								<NavLink to={AppRoutes.USER_PROFILE + '/' + currentFilm?.owner.id}>{currentFilm?.owner.name}</NavLink>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default FilmDetailed;
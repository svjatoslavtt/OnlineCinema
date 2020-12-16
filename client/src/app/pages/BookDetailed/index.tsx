import Rating from '@material-ui/lab/Rating';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import _ from 'lodash';
import EditIcon from '@material-ui/icons/Edit';

import styles from './style.module.scss';

import { Actions } from '../../redux/books/action';
import { getCurrentBook, getIsLikeBook, getIsRatedBook } from '../../redux/books/selectors';
import Title from '../../shared/components/Title';
import Likes from '../../shared/components/Icons/Likes';
import { getLoading } from '../../redux/loading/selectors';
import { getAuthToken } from '../../redux/auth/selectors';
import { AppRoutes } from '../../routes/routes-const';
import image404 from '../../static/images/image404.jpg';
import NavBar from '../../shared/components/Header';

const BookDetailed: React.FC = () => {
	const history = useHistory();
	const [error, setError] = useState('');
	const [ratingHoverValue, setRatingHoverValue] = useState<number | null>(0);
	const { bookId }: { bookId: string } = useParams();
	const dispatch = useDispatch();
	const currentBook = useSelector(getCurrentBook);
	const loading = useSelector(getLoading);
	const isLike = useSelector(getIsLikeBook);
	const isRate = useSelector(getIsRatedBook);
	const token = useSelector(getAuthToken);

	useEffect(() => {
		dispatch(Actions.getCurrentBookRequest({ bookId }));
	}, [dispatch, bookId]);

	const handlerChangeRating = useCallback(
		_.debounce(
			(_: React.ChangeEvent<{}>, newValue: number | null) => {
				if (token) {
					dispatch(Actions.rateBookRequest({ bookId, rating: newValue, token }));
				}
			}, 
			500, 
			{
				leading: true,
				trailing: false,
			}
			
	), [isLike, token]);

	const handlerSetRating = () => !token && setError('Нужно авторизоваться!');

	const handlerBookLike = useCallback(
		_.debounce(
			() => {
				if (token) {
					if (isLike) {
						dispatch(Actions.dislikeBookRequest({ bookId, token }));
					} else {
						dispatch(Actions.likeBookRequest({ bookId, token }));
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

	const isOwner = currentBook?.owner.id === JSON.parse(localStorage.getItem('id') as string);

	const handlerEditBook = () => {
		history.push(AppRoutes.EDIT_BOOK + '/' + bookId);
	};

	return (
		<>
			<NavBar />
			<div className={styles.bookDetailed}>
				<Title title='Подробнее' goBack={true} />

				<div className={styles.contentWrapper}>
					<div className={styles.imageBlock}>
						<div className={styles.imageWrapper}>
							{!loading && (
								<img src={currentBook?.image || image404} alt={currentBook?.title} />
							)}
							{isOwner && (
								<div className={styles.editBook} onClick={handlerEditBook}>
									<EditIcon />
								</div>
							)}
						</div>
					</div>
					<div className={styles.infoBlock}>
						{!loading && (
							<div>
								<div className={styles.title}>{currentBook?.title}</div>
								<div className={styles.description}>{currentBook?.description}</div>
								<div className={styles.director}>{`Режисёр: ${currentBook?.director}`}</div>
								<div className={styles.rating}>
									<span className={styles.ratingCounter}>
										{`Рейтинг книги: ${currentBook?.averageRating}`}
										<span className={styles.peopleRated}>{`(голосов: ${currentBook?.peopleRated})`}</span>
									</span>
									<div onClick={handlerSetRating}>	
										{
											isRate || !token ? (
												<Rating
													name='read-only'
													value={currentBook?.averageRating ?? 5}
													precision={0.1}
													readOnly
												/>
											) : (
												<Rating
													name='simple-controlled'
													value={currentBook?.averageRating ?? 5}
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
									<Likes onClick={handlerBookLike} />
									<span className={styles.likes}>{currentBook?.likes}</span>
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
									<NavLink to={AppRoutes.USER_PROFILE + '/' + currentBook?.owner.id}>{currentBook?.owner.name}</NavLink>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default BookDetailed;
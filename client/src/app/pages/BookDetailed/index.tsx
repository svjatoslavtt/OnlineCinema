import Rating from '@material-ui/lab/Rating';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import _ from 'lodash';
import EditIcon from '@material-ui/icons/Edit';

import styles from './style.module.scss';

import { Actions } from '../../redux/books/action';
import { getCurrentBook, getIsLikeBook, getIsRatedBook } from '../../redux/books/selectors';
import { getLoading } from '../../redux/loading/selectors';
import { getAuthToken } from '../../redux/auth/selectors';
import { AppRoutes } from '../../routes/routes-const';
import image404 from '../../static/images/image404.jpg';
import Header from '../../shared/components/Header';
import Banner from '../../shared/components/Banner';
import bookImage from '../../static/images/book-image.jpg';
import Footer from '../../shared/components/Footer';
import AdditionalBooks from '../../shared/components/AdditionalBooks';
import { BOOKS } from '../Home/data/books-data';

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

	const isOwner = currentBook?.owner.id === JSON.parse(localStorage.getItem('id') as string);

	const handlerEditBook = () => {
		history.push(AppRoutes.EDIT_BOOK + '/' + bookId);
	};

	return (
		<>
			<Header />

			<Banner title='Стив Джобс' />

			<div className={styles.bookDetailed}>
				<div className={styles.contentWrapper}>
					<div className={styles.leftSideWrapper}>
						<div className={styles.imageBlock}>
							{!loading && (
								<img src={bookImage || image404} alt={currentBook?.title} />
							)}
							{isOwner && (
								<div className={styles.editBook} onClick={handlerEditBook}>
									<EditIcon />
								</div>
							)}
						</div>

						<div className={styles.buttons}>
							<button className={styles.addToCart}>В Корзину</button>
							<div className={styles.addToFavorite}><i className="fas fa-heart"></i></div>
						</div>
					</div>

					<div className={styles.infoBlock}>
						{!loading && (
							<div>
								<div className={styles.title}>{currentBook?.title || 'Стив Джобс'}</div>

								<div className={styles.author}>
									<span className={styles.itemTitle}>Автор:</span>
									{currentBook?.director || 'Айзек Конор'}
								</div>

								<div className={styles.rating}>
									<span className={styles.ratingCounter}>
										<span className={styles.itemTitle}>Рейтинг:</span>
										<span className={styles.rateStars} onClick={handlerSetRating}>	
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
										</span>
										{currentBook?.averageRating || '5.0'}
										<span className={styles.peopleRated}>{`(голосов: ${currentBook?.peopleRated || '413'})`}</span>
									</span>

									
								</div>

								<div className={styles.genres}>
									<span className={styles.itemTitle}>Жанры:</span>
									Деловая литература, Зарубежная публицистика, Истории успеха, Биографии и мемуары, Биографии и Мемуары
								</div>

								<div className={styles.originalName}>
									<span className={styles.itemTitle}>Оригинальное название:</span>
									Steve Jobs: A Biography
								</div>

								<div className={styles.description}>
									<span className={styles.itemTitle}>О Книге:</span>
									{
										currentBook?.description || `Впервые написанная и единственная «официальная» биография, созданная при стопроцентном участии самого Стива Джобса. Книга стала одним из главных бестселлеров наших лет. История выдающегося человека была написана приблизительно за три года на основании диалогов с родственниками и соседями, бесед с друзьями и врагами, интервью с коллегами и конкурентами.
										Это рассказ о жизни легендарного человека, который оставил свой след в новой истории, изменив целый мир с помощью своего творческого гения, неустанной работы и переворота в компьютерной индустрии.`
									}
								</div>
								
							</div>
						)}
					</div>
				</div>
			</div>

			<AdditionalBooks count={0} data={BOOKS} title='Другие книги автора – Уолтера Айзексона' />

			<AdditionalBooks count={1} data={BOOKS} title='Похожие на книгу – "Стив Джобс"' />

			<Footer />
		</>
	);
};

export default BookDetailed;
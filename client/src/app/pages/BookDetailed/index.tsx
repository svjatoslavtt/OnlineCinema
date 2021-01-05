import Rating from '@material-ui/lab/Rating';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import _ from 'lodash';
import EditIcon from '@material-ui/icons/Edit';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import styles from './style.module.scss';

import { BOOKS } from '../Home/data/books-data';

import { Actions } from '../../redux/books/action';
import { getCurrentBook, getIsLikeBook, getIsRatedBook } from '../../redux/books/selectors';
import { getLoading } from '../../redux/loading/selectors';
import { getAuthToken } from '../../redux/auth/selectors';
import { AppRoutes } from '../../routes/routes-const';
import image404 from '../../static/images/image404.jpg';
import Header from '../../shared/components/Header';
import Banner from '../../shared/components/Banner';
import bookImage from '../../static/images/book-image2.webp';
import Footer from '../../shared/components/Footer';
import AdditionalBooks from '../../shared/components/AdditionalBooks';
import Specifications from './components/Specifications';

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

	const isMedia = useMediaQuery('(max-width: 900px)');

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

			<Banner title='Кладбище домашних животных' subtitle='2020, Триллеры' />

			<main className={styles.container}>
				<section className={styles.avatar}>
					{!loading && (
						<img src={bookImage || image404} alt={currentBook?.title} />
					)}
					{isOwner && (
						<div className={styles.editButton} onClick={handlerEditBook}>
							<EditIcon />
						</div>
					)}
				</section>

				<section className={styles.information}>
					{!loading && (
						<>
							<div className={styles.title}>{currentBook?.title || 'Кладбище домашних животных'}</div>

							<div className={styles.rating}>
								<span className={styles.ratingCounter}>
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
													precision={1}
													onChange={handlerChangeRating}
												/>
											)
										}
									</span>
									{currentBook?.averageRating || '5.0'}
									<span className={styles.peopleRated}>{`${currentBook?.peopleRated || '413'}`}</span>
								</span>
							</div>

							<div className={styles.bookInformationBlock}>
								<div className={styles.inStock}>
									<i className="fas fa-check"></i>
									<span>В наличии</span> 
								</div>

								<div className={styles.payment}>
									<div className={styles.paymentPrice}>
										<span>Цена:</span>

										<div className={styles.currentPrice}>
											549
											<span>грн.</span>
										</div>		

										<div className={styles.oldPrice}>
											<div className={styles.sale}>Скидка 23%</div>	
											<span>749 грн</span>	
										</div>
									</div>

									<div className={styles.paymentCount}>
										<i className="fas fa-cart-arrow-down" />
										148 раз купили
									</div>
								</div>

								<button className={styles.buyButton}>Добавить в корзину</button>
							</div>
							
							<Specifications />
						</>
					)}
				</section>
			</main>

			<section className={styles.description}>
				<div className={styles.descriptionContent}>
					<span className={styles.title}>О книге</span>

					<span className={styles.text}>
						Роман, который сам Кинг, считая "слишком страшным", долго не хотел отдавать в печать, но только за первый год было продано 657 000 экземпляров! Также роман лег в основу одноименного фильма Мэри Ламберт (где Кинг, кстати, сыграл небольшую роль).

						Казалось бы, семейство Крид — это настоящее воплощение "американской мечты": отец — преуспевающий врач, красавица мать, прелестные дети. Для полной идиллии им не хватает лишь большого старинного дома, куда они вскоре и переезжают.

						Но идиллия вдруг стала превращаться в кошмар. Потому что в окружающих их новое жилище вековых лесах скрывается НЕЧТО, более ужасное, чем сама смерть и… более могущественное.

						Читайте легендарный роман Стивена Кинга "КлаТбище домашних жЫвотных" — в новом переводе и впервые без сокращений!
					</span>
				</div>	
			</section>

			<AdditionalBooks count={0} data={BOOKS} title='Другие книги автора – Уолтера Айзексона' />

			<AdditionalBooks count={1} data={BOOKS} title='Похожие на книгу – "Стив Джобс"' />

			<Footer />
		</>
	);
};

export default BookDetailed;
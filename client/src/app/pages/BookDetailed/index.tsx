import Rating from '@material-ui/lab/Rating';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import _ from 'lodash';
import EditIcon from '@material-ui/icons/Edit';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import styles from './style.module.scss';
import Specifications from './components/Specifications';

import { Actions } from '../../redux/books/action';
import { getBookByAuthor, getBooksLikeABook, getCurrentBook, getIsLikeBook, getIsRatedBook } from '../../redux/books/selectors';
import { getLoading } from '../../redux/loading/selectors';
import { getAuthToken } from '../../redux/auth/selectors';
import { AppRoutes } from '../../routes/routes-const';
import image404 from '../../static/images/image404.jpg';
import Header from '../../shared/components/Header';
import Banner from '../../shared/components/Banner';
import Footer from '../../shared/components/Footer';
import AdditionalBooks from '../../shared/components/AdditionalBooks';
import { Book } from '../../redux/books/types';

const BookDetailed: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [error, setError] = useState('');
	const [ratingHoverValue, setRatingHoverValue] = useState<number | null>(0);
	const { bookId }: { bookId: string } = useParams();
	const currentBook = useSelector(getCurrentBook);
	const booksByAuthor = useSelector(getBookByAuthor);
	const likeABook = useSelector(getBooksLikeABook);
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

	// const isOwner = currentBook?.owner.id === JSON.parse(localStorage.getItem('id') as string);

	const handlerEditBook = () => {
		history.push(AppRoutes.EDIT_BOOK + '/' + bookId);
	};

	const priceStyles = [
		currentBook?.discountPrice ? styles.priceCrossedOut : styles.price
	];

	return (
		<>
			<Header />

			<Banner title={currentBook?.title} subtitle={`${currentBook?.yearOfPublish}, ${currentBook?.genre}`} />

			<main className={styles.container}>
				<section className={styles.avatar}>
					{!loading && (
						<img src={currentBook?.file || image404} alt={currentBook?.title} />
					)}
					{/* {isOwner && (
						<div className={styles.editButton} onClick={handlerEditBook}>
							<EditIcon />
						</div>
					)} */}
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
													value={currentBook?.averageRating ?? 0}
													precision={0.1}
													readOnly
												/>
											) : (
												<Rating
													name='simple-controlled'
													value={currentBook?.averageRating ?? 0}
													onChangeActive={(_, value) => {
														setRatingHoverValue(value);
													}}
													precision={1}
													onChange={handlerChangeRating}
												/>
											)
										}
									</span>
									{currentBook?.averageRating || '0'}
									<span className={styles.peopleRated}>{`${currentBook?.countOfRated ? currentBook.countOfRated : '0'}`}</span>
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

										{currentBook?.discountPrice && (
											<div className={styles.discountPrice}>
												{currentBook?.discountPrice}
												<span>грн.</span>
											</div>	
										)}	

										<div className={styles.priceWrapper}>
											{currentBook?.discountPercent && <div className={styles.badge}>{'Скидка ' + currentBook?.discountPercent + '%'}</div>	}
											<span className={priceStyles.join(' ')}>{currentBook?.price + 'грн.'}</span>	
										</div>
									</div>

									<div className={styles.paymentCount}>
										<i className="fas fa-cart-arrow-down" />
										148 раз купили
									</div>
								</div>

								<button className={styles.buyButton}>Добавить в корзину</button>
							</div>
							
							<Specifications currentBook={currentBook} />
						</>
					)}
				</section>
			</main>

			<section className={styles.description}>
				<div className={styles.descriptionContent}>
					<span className={styles.title}>О книге</span>

					<span className={styles.text}>{currentBook?.description}</span>
				</div>	
			</section>

			{booksByAuthor?.length ? <AdditionalBooks count={0} data={booksByAuthor} title={`Другие книги автора – ${currentBook?.author}`} /> : null}

			{likeABook?.length ? <AdditionalBooks count={1} data={likeABook} title={`Похожие на книгу – "${currentBook?.title}"`} /> : null}

			<Footer />
		</>
	);
};

export default BookDetailed;
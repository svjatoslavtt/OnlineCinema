import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import styles from "./style.module.scss";
import Carousel from './components/Carousel';
import { BOOKS } from "./data/books-data";

import NavBar from "../../shared/components/Header";
import { Categories } from "../../shared/svg/Categories";
import { AppRoutes } from "../../routes/routes-const";
import popularImage from "../../static/images/popular-image2.jpg";
import popularImage2 from "../../static/images/popular-image.jpg";
import Footer from "../../shared/components/Footer";
import BookTypeTable from "../../shared/components/BookItem/BookTypeTable";
import Products from "../../shared/components/Products";
import { Actions } from "../../redux/books/action";
import { getBooks, getDiscountBooks } from "../../redux/books/selectors";

const NewsFeed: React.FC = () => {
	const dispatch = useDispatch();
	const discountBooks = useSelector(getDiscountBooks);
	const isMedia = useMediaQuery('(max-width: 600px)');

	useEffect(() => {
		dispatch(Actions.getDiscountBooksRequest());
	}, []);

  return (
		<>
			<NavBar />

			<main className={styles.container}>
				<section className={styles.posters}>
					<div className={styles.categories}>
						<div className={styles.categoriesTitle}>
							<Categories />
							Жанры
						</div>

						<ul>
							<NavLink to={AppRoutes.Catalog}><li>Фэнтези</li></NavLink>
							<NavLink to='/'><li>Ужасы</li></NavLink>
							<NavLink to='/'><li>Комиксы</li></NavLink>
							<NavLink to='/'><li>Наука</li></NavLink>
							<NavLink to='/'><li>Программирование</li></NavLink>
							<NavLink to='/'><li>Личная эффективноть</li></NavLink>
							<NavLink to='/'><li>Фантастика</li></NavLink>
							<NavLink to='/'><li>Художественная литература</li></NavLink>
						</ul>
					</div>

					<div className={styles.postersWrapper}>
						<div className={styles.search}>
							<div className={styles.searchWrapper}>
								<div className={styles.searchingInput}>
									<input type="text" placeholder="Какую книгу вы хотите найти..." />
								</div>
							
								{!isMedia && (
									<NavLink to={AppRoutes.GENRES} className={styles.genres}>
										Все жанры
										<i className="fas fa-bookmark"></i>
									</NavLink>
								)}

								{isMedia && (
									<button className={styles.searchingButton}>
										<i className="fas fa-search"></i>
									</button>
								)}
							</div>

							{!isMedia && (
								<button className={styles.searchingButton}>
									<i className="fas fa-search"></i>
								</button>
							)}

							{isMedia && (
								<NavLink to={AppRoutes.GENRES} className={styles.genres}>
									Все жанры
									<i className="fas fa-bookmark"></i>
								</NavLink>
							)}
						</div>

						<Carousel />
					</div>
				</section>

				<section className={styles.recommended}>
					<div className={styles.recommendedItem}>
						<img className={styles.recommendedImage} src={popularImage2} />
						<div className={styles.recommendedInfo}>
							<span className={styles.recommendedTitle}>Высший рейтинг</span>
							<span className={styles.recommendedSubtitle}>
								<NavLink to='/'>Смотреть книги</NavLink>
							</span>
						</div>
					</div>

					<div className={styles.recommendedItem}>
						<img className={styles.recommendedImage} src={popularImage} />
						<div className={styles.recommendedInfo}>
							<span className={styles.recommendedTitle}>Самые продаваемые</span>
							<span className={styles.recommendedSubtitle}>
							<NavLink to='/'>Смотреть книги</NavLink>
							</span>
						</div>
					</div>
				</section>

				<section className={styles.sale}>
					<div className={styles.saleTitle}>
						Книги по скидке
					</div>

					<div className={styles.saleContainer}>

						<Products data={discountBooks} bigGrid={true} />
					
						<div className={styles.viewMore}>
							<NavLink to='/'>
								<button>
									Смотреть
								</button>
							</NavLink>
						</div>
					</div>
				</section>

				<section className={styles.announcement}>
					<div className={styles.announcementContainer}>
						<div className={styles.announcementTitle}>
							Распродажа книг до -30%
						</div>

						<div className={styles.announcementSubtitle}>
							Наличие ограничено. Закажите сейчас, чтобы избежать разочарования.
						</div>

						<NavLink to='/'>
							<button className={styles.announcementButton}>
								Смотреть
							</button>
						</NavLink>
					</div>
				</section>
			</main>

			<Footer />
		</>
  );
};

export default NewsFeed;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink, useHistory } from "react-router-dom";

import { GENRES } from "./data/genres";
import styles from "./style.module.scss";
import Carousel from './components/Carousel';

import { Actions } from "../../redux/books/action";
import { getBooks } from "../../redux/books/selectors";
import { getFilterBooks } from "../../redux/filter/selectors";
import Categorie from "../../shared/components/Categorie";
import Pagination from "../../shared/components/Pagination";
import Filter from "../../shared/components/Filter";
import NavBar from "../../shared/components/Header";
import { Categories } from "../../shared/svg/Categories";
import { AppRoutes } from "../../routes/routes-const";
import popularImage from "../../static/images/popular-image2.jpg";
import popularImage2 from "../../static/images/popular-image.jpg";
import popularImage3 from "../../static/images/popular-image3.jpg";
import Footer from "../../shared/components/Footer";
import Book from "../../shared/components/BookItem";
import { BOOKS } from "./data/books-data";

const NewsFeed: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const books = useSelector(getBooks);
	const filterBooks = useSelector(getFilterBooks);

	const [booksState, setBooksState] = useState<any>(null);
	const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

	const parseUrl = queryString.parseUrl(history.location.search);

	useEffect(() => {
		if (Object.keys(parseUrl.query).length !== 0 && parseUrl.query.page) {
			dispatch(Actions.getCurrentPageRequest({ page: Number(parseUrl.query.page) }));
		} else if (Object.keys(parseUrl.query).length === 0) {
			dispatch(Actions.getCurrentPageRequest({ page: 1 }));
		};
	}, [dispatch]);

	useEffect(() => {
		if (filterBooks) {
			setBooksState(filterBooks);
		} else {
			setBooksState(books);
		}
	}, [filterBooks, books]);

	const dropdownStyles = [
		styles.dropdownGenresList, 
		isOpenDropdown ? styles.active : styles.disactive
	];

  return (
		<>
			<NavBar />

			<main className={styles.container}>
				<section className={styles.posters}>
					<div className={styles.categories}>
						<div className={styles.categoriesTitle}>
							<Categories />
							Genres
						</div>

						<ul>
							<NavLink to={AppRoutes.BOOKS}><li>Фэнтези</li></NavLink>
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
									<input type="text" placeholder="Search Books Here" />
								</div>

								<div className={styles.select} onClick={setIsOpenDropdown.bind(null, !isOpenDropdown)}>
									All genres
									<i className="fas fa-bookmark"></i>
								</div>
							</div>

							<button className={styles.searchingButton}>
								<i className="fas fa-search"></i>
							</button>

							<div className={dropdownStyles.join(' ')}>
								<div id="genresWrapper" className={styles.genresWrapper}>
									{GENRES.map((item, idx) => {
										return (
											<div key={idx} className={styles.genreItemContainer}>
												<img src={popularImage3} alt={item} />
												<NavLink to='' className={styles.genreItem}>{item}</NavLink>
											</div>
										)
									})}
								</div>
							</div>	
						</div>

						<Carousel />
					</div>
				</section>

				<section className={styles.popular}>
					<div className={styles.popularItem}>
						<img className={styles.popularImage} src={popularImage2} />
						<div className={styles.popularInfo}>
							<span className={styles.popularTitle}>Most Rating</span>
							<span className={styles.popularSubtitle}>
								<NavLink to='/'>Watch books</NavLink>
							</span>
						</div>
					</div>

					<div className={styles.popularItem}>
						<img className={styles.popularImage} src={popularImage} />
						<div className={styles.popularInfo}>
							<span className={styles.popularTitle}>Most Sales</span>
							<span className={styles.popularSubtitle}>
								<NavLink to='/'>Watch books</NavLink>
							</span>
						</div>
					</div>
				</section>

				<section className={styles.sale}>
					<div className={styles.saleTitle}>
						Special Offer Books
					</div>

					<div className={styles.saleContainer}>
					
						{BOOKS.map(({ id, sale, image, name, oldPrice, currentPrice }) => {
							return (
								<Book 
									key={id}
									sale={sale}
									image={image}
									name={name}
									oldPrice={oldPrice}
									currentPrice={currentPrice}
								/>
							)
						})}
					
						
						<div className={styles.viewMore}>
							<NavLink to='/'>
								<button>
									view more
								</button>
							</NavLink>
						</div>
					</div>
				</section>

				<section className={styles.announcement}>
					<div className={styles.announcementContainer}>
						<div className={styles.announcementTitle}>
							End of Season Clearance Sale upto 30%
						</div>

						<div className={styles.announcementSubtitle}>
							Stock is limited. Order now to avoid disappointment.
						</div>

						<NavLink to='/'>
							<button className={styles.announcementButton}>
								Shop now
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
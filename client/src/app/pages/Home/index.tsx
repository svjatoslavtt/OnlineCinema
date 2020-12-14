import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { NavLink, useHistory } from "react-router-dom";

import { GENRES } from "./data/genres";
import styles from "./style.module.scss";
import { ITEM_DATA } from "./data/item-data";
import CarouselItem from "./components/CarouselItem";

import { Actions } from "../../redux/books/action";
import { getBooks } from "../../redux/books/selectors";
import { getFilterBooks } from "../../redux/filter/selectors";
import Categorie from "../../shared/components/Categorie";
import Pagination from "../../shared/components/Pagination";
import Filter from "../../shared/components/Filter";
import NavBar from "../../shared/components/NavBar";
import { Categories } from "../../shared/svg/Categories";
import { AppRoutes } from "../../routes/routes-const";
import popularImage from "../../static/images/popular-image2.jpg";
import popularImage2 from "../../static/images/popular-image.jpg";
import popularImage3 from "../../static/images/popular-image3.jpg";
import bookImage from "../../static/images/book-image.jpg";
import { stubArray } from "lodash";

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

	const indicatorStyles = {
		display: 'flex',
		justifyContent: 'center',
		margin: '0 8px',
		color: '#fff',
		fontSize: '14px',
		fontFamily: 'Times-New-Roman, sans-serif',
		cursor: 'pointer',
		outline: 'none',
		alignItems: 'center',
		lineHeight: 1.1,
		background: '#333333fa',
		height: 10,
		width: 10,
		borderRadius: '50%',
	};

  return (
		<>
			<NavBar />

			<main className={styles.home}>
				<section className={styles.posters}>
					<div className={styles.categories}>
						<div className={styles.categoriesTitle}>
							<Categories />
							Genres
						</div>

						<ul>
							<NavLink to='/'><li>Фэнтези</li></NavLink>
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

						<div className={styles.carouselOfAnnouncement}>
							<Carousel 
								showArrows={false} 
								showThumbs={false} 
								showStatus={false} 
								showIndicators={true} 
								swipeable={true}
								emulateTouch={true}
								autoPlay={true}
								interval={3000}
								transitionTime={400}
								infiniteLoop={true}
								stopOnHover={true}
								renderIndicator={(onClickHandler, isSelected, index, label) => {
									if (isSelected) {
										return (
											<li
												style={{ ...indicatorStyles, background: '#009688', }}
												aria-label={`Selected: ${label} ${index + 1}`}
												title={`Selected: ${label} ${index + 1}`}
											></li>
										);
									}
									return (
										<li
											style={indicatorStyles}
											onClick={onClickHandler}
											onKeyDown={onClickHandler}
											value={index}
											key={index}
											role="button"
											tabIndex={0}
											title={`${label} ${index + 1}`}
											aria-label={`${label} ${index + 1}`}
										></li>
									);
							}}
							>
								{ITEM_DATA.map((props, index) => (
									<CarouselItem key={index} {...props} />
								))}
							</Carousel >
						</div>
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

						<div className={styles.book}>
							<div className={styles.bookBadge}>-4%</div>

							<div className={styles.bookImage}>
								<img src={bookImage} alt="book of sale"/>
							</div>

							<div className={styles.bookInfo}>
								<div className={styles.bookName}>Стив Джобс</div>
								
								<div className={styles.bookPrice}>
									<span className={styles.oldPrice}>{`${200} ₴`}</span>
									<span className={styles.currentPrice}>{`${192} ₴`}</span>
								</div>
							</div>

							<div className={styles.bookActions}>
								<div className={styles.addToFavorite}><i className="fas fa-heart"></i></div>
								<button className={styles.addToCart}>Add to cart</button>
								<div className={styles.bookDetails}><i className="fas fa-search"></i></div>
							</div>
						</div>

						<div className={styles.book}>
							<div className={styles.bookImage}>
								<img src={bookImage} alt="book of sale"/>
							</div>

							<div className={styles.bookInfo}>
								<div className={styles.bookName}>Грокаем алгоритмы</div>
								
								<div className={styles.bookPrice}>
									<span className={styles.oldPrice}>{`$${200}`}</span>
									<span className={styles.currentPrice}>{`$${159}`}</span>
								</div>
							</div>

							<div className={styles.bookActions}>
								<div className={styles.addToFavorite}><i className="fas fa-heart"></i></div>
								<button className={styles.addToCart}>Add to cart</button>
								<div className={styles.bookDetails}><i className="fas fa-search"></i></div>
							</div>
						</div>

						<div className={styles.book}>
							<div className={styles.bookImage}>
								<img src={bookImage} alt="book of sale"/>
							</div>

							<div className={styles.bookInfo}>
								<div className={styles.bookName}>Грокаем алгоритмы</div>
								
								<div className={styles.bookPrice}>
									<span className={styles.oldPrice}>{`$${200}`}</span>
									<span className={styles.currentPrice}>{`$${159}`}</span>
								</div>
							</div>

							<div className={styles.bookActions}>
								<div className={styles.addToFavorite}><i className="fas fa-heart"></i></div>
								<button className={styles.addToCart}>Add to cart</button>
								<div className={styles.bookDetails}><i className="fas fa-search"></i></div>
							</div>
						</div>

						<div className={styles.book}>
							<div className={styles.bookImage}>
								<img src={bookImage} alt="book of sale"/>
							</div>

							<div className={styles.bookInfo}>
								<div className={styles.bookName}>Грокаем алгоритмы</div>
								
								<div className={styles.bookPrice}>
									<span className={styles.oldPrice}>{`$${200}`}</span>
									<span className={styles.currentPrice}>{`$${159}`}</span>
								</div>
							</div>

							<div className={styles.bookActions}>
								<div className={styles.addToFavorite}><i className="fas fa-heart"></i></div>
								<button className={styles.addToCart}>Add to cart</button>
								<div className={styles.bookDetails}><i className="fas fa-search"></i></div>
							</div>
						</div>
						
						<div className={styles.viewMore}>
							<button>view more</button>
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

						<button className={styles.announcementButton}>
							Shop now
						</button>
					</div>
				</section>

				<footer className={styles.footer}>
					<div className={styles.footerContainer}>
						<div className={styles.footerList}>
							<div className={styles.logo}>
								BookStock
							</div>
							<div className={styles.adress}>
								59 Street, Newyork City, Rose Town, 05 Rive House
							</div>
							<div className={styles.number}>
								+123 456 7890
							</div>
							<div className={styles.email}>
								info@example.com
							</div>
						</div>

						<div className={styles.footerList}>
							<div className={styles.listTitle}>Information</div>
							<div className={styles.listElement}>Most popular books</div>
							<div className={styles.listElement}>Most sales books</div>
							<div className={styles.listElement}>Books sale</div>
							<div className={styles.listElement}>About us</div>
							<div className={styles.listElement}>Contact us</div>
						</div>

						<div className={styles.footerList}>
							<div className={styles.listTitle}>My account</div>
							<div className={styles.listElement}>My account</div>
							<div className={styles.listElement}>Login/Register</div>
						</div>

					</div>
					<div className={styles.footerSubelemt}>
						<div className={styles.copyright}>
							© Copyright Metro 2020.
						</div>

						<div className={styles.socialNetworks}>
							<span>1</span>
							<span>2</span>
							<span>3</span>
							<span>4</span>
							<span>5</span>
						</div>
					</div>
				</footer>
			</main>
		</>
  );
};

export default NewsFeed;
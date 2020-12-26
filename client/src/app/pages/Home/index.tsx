import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink } from "react-router-dom";

import { GENRES } from "./data/genres";
import styles from "./style.module.scss";
import Carousel from './components/Carousel';
import { BOOKS } from "./data/books-data";

import NavBar from "../../shared/components/Header";
import { Categories } from "../../shared/svg/Categories";
import { AppRoutes } from "../../routes/routes-const";
import popularImage from "../../static/images/popular-image2.jpg";
import popularImage2 from "../../static/images/popular-image.jpg";
import popularImage3 from "../../static/images/popular-image3.jpg";
import Footer from "../../shared/components/Footer";
import BookTypeTable from "../../shared/components/BookItem/BookTypeTable";

const NewsFeed: React.FC = () => {
	const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

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
									<input type="text" placeholder="Поиск книги" />
								</div>

								<div className={styles.select} onClick={setIsOpenDropdown.bind(null, !isOpenDropdown)}>
									Все жанры
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
					
						{BOOKS.map(({ id, sale, image, name, oldPrice, currentPrice }) => {
							return (
								<BookTypeTable 
									key={id}
									sale={sale}
									image={image}
									name={name}
									oldPrice={oldPrice}
									currentPrice={currentPrice}
									bigGrid={true}
								/>
							)
						})}
					
						
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
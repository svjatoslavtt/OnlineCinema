import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string';

import { Actions } from "../../redux/books/action";
import { getBooks } from "../../redux/books/selectors";
import { getFilterBooks } from "../../redux/filter/selectors";
import Categorie from "../../shared/components/Categorie";
import Pagination from "../../shared/components/Pagination";
import styles from "./style.module.scss";
import { NavLink, useHistory } from "react-router-dom";
import Filter from "../../shared/components/Filter";
import NavBar from "../../shared/components/NavBar";
import { Categories } from "../../shared/svg/Categories";
import { AppRoutes } from "../../routes/routes-const";

const NewsFeed: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const books = useSelector(getBooks);
	const filterBooks = useSelector(getFilterBooks);

	const [booksState, setBooksState] = useState<any>(null);

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
						</ul>
					</div>

					<div className={styles.postersWrapper}>
						<div className={styles.search}>
							<div className={styles.searchWrapper}>
								<input className={styles.searchingInput} type="text" placeholder="Search Books Here" />

								<div className={styles.select}>
									All genres
									<i className="fas fa-sort-up"></i>
								</div>
							</div>

							<button className={styles.searchingButton}>
								<i className="fas fa-search"></i>
							</button>
						</div>

						<div className={styles.carouselOfAnnouncement}></div>
					</div>
				</section>

				{/* <div className={styles.newsFeedContainer}>
					<Categorie title='Все книги' data={booksState} newsFeed={true} />
					{!filterBooks && <Pagination />}
				</div> 
				<Filter /> */}

			</main>
		</>
  );
};

export default NewsFeed;
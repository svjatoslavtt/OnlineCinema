import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string';

import { Actions } from "../../redux/books/action";
import { getFilms } from "../../redux/books/selectors";
import { getFilterFilms } from "../../redux/filter/selectors";
import Categorie from "../../shared/components/Categorie";
import Pagination from "../../shared/components/Pagination";
import styles from "./style.module.scss";
import { useHistory } from "react-router-dom";
import Filter from "../../shared/components/Filter";

const NewsFeed: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const films = useSelector(getFilms);
	const filterFilms = useSelector(getFilterFilms);

	const [filmsState, setFilmsState] = useState<any>(null);

	const parseUrl = queryString.parseUrl(history.location.search);

	useEffect(() => {
		if (Object.keys(parseUrl.query).length !== 0 && parseUrl.query.page) {
			dispatch(Actions.getCurrentPageRequest({ page: Number(parseUrl.query.page) }));
		} else if (Object.keys(parseUrl.query).length === 0) {
			dispatch(Actions.getCurrentPageRequest({ page: 1 }));
		};
	}, [dispatch]);

	useEffect(() => {
		if (filterFilms) {
			setFilmsState(filterFilms);
		} else {
			setFilmsState(films);
		}
	}, [filterFilms, films]);
	
  return (
		<>
			<div className={styles.newsFeedContainer}>
				<Categorie title='Все книги' data={filmsState} newsFeed={true} />
				{!filterFilms && <Pagination />}
			</div>
			<Filter />
		</>
  );
};

export default NewsFeed;
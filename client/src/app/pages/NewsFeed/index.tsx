import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string';

import { Actions } from "../../redux/films/action";
import { Actions as FilterActions } from "../../redux/filter/actions";
import { getFilms } from "../../redux/films/selectors";
import { getFilterFilms } from "../../redux/filter/selectors";
import Categorie from "../../shared/components/Categorie";
import Pagination from "../../shared/components/Pagination";
import styles from "./style.module.scss";
import { useHistory } from "react-router-dom";


const NewsFeed: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const films = useSelector(getFilms);
	const filterFilms = useSelector(getFilterFilms);

	const [filmsState, setFilmsState] = useState<any>(null);

	useEffect(() => {
		const parseUrl = queryString.parseUrl(history.location.search);

		if (Object.keys(parseUrl.query).length !== 0) {
			dispatch(Actions.getCurrentPageRequest({page: Number(parseUrl.query.page)}));
		} else {
			dispatch(Actions.getCurrentPageRequest({page: 1}))
		};
	}, [dispatch, history.location.search]);

	useEffect(() => {
		if (filterFilms) {
			setFilmsState(filterFilms);
		} else {
			setFilmsState(films);
		}
	}, [filterFilms, films]);

  return (
    <div className={styles.newsFeedContainer}>
			<Categorie title='Все фильмы' data={filmsState} newsFeed={true} />
			<Pagination />
    </div>
  );
};

export default NewsFeed;
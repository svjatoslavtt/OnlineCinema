import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Actions } from "../../redux/films/action";
import { getFilms } from "../../redux/films/selectors";
import { getFilterFilms } from "../../redux/filter/selectors";
import Categorie from "../../shared/components/Categorie";
import Pagination from "../../shared/components/Pagination";
import styles from "./style.module.scss";

const NewsFeed: React.FC = () => {
	const dispatch = useDispatch();
	const films = useSelector(getFilms);
	const filterFilms = useSelector(getFilterFilms);

	const [filmsState, setFilmsState] = useState<any>(null);

	useEffect(() => {
		dispatch(Actions.getCurrentPageRequest({page: 1}));
	}, []);

	useEffect(() => {
		if (!films?.length) {
			dispatch(Actions.getFilmsRequest());
		}
	}, [dispatch, films]);

	useEffect(() => {
		if (filterFilms) {
			setFilmsState(filterFilms);
		} else {
			setFilmsState(films);
		}
	}, [filterFilms, films]);

  return (
    <div className={styles.newsFeedContainer}>
			<Categorie title='Все фильмы' data={filmsState} />
			<Pagination />
    </div>
  )
}

export default NewsFeed;
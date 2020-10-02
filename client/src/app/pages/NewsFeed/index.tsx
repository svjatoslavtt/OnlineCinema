import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../redux/get-films/action";
import { getFilms } from "../../redux/get-films/selectors";
import Categorie from "../../shared/components/Categorie";
import styles from "./style.module.scss";

const NewsFeed: React.FC = () => {
	const dispatch = useDispatch();
	const films = useSelector(getFilms);

	useEffect(() => {
		dispatch(Actions.getFilmsRequest());
	}, [dispatch]);

  return (
    <div className={styles.newsFeedContainer}>
			<Categorie title='Все фильмы' data={films} />
    </div>
  )
}

export default NewsFeed;
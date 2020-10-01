import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../redux/get-films/action";
import { getFilms } from "../../redux/get-films/selectors";

import Film from "./components/Film.tsx";
import styles from "./style.module.scss";

const NewsFeed: React.FC = () => {
	const dispatch = useDispatch();
	const films = useSelector(getFilms);

	useEffect(() => {
		dispatch(Actions.getFilmsRequest());
	}, [dispatch]);

  return (
    <div className={styles.newsFeedContainer}>
			{films && 
				films.length && 
					films.map(({ id, title, rating, image }) => {
						return (
							<Film 
								key={id}
								title={title}
								rating={rating}
								image={image}
						/>
						)
					})
			}
    </div>
  )
}

export default NewsFeed;
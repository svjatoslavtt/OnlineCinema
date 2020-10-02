import React from 'react';
import Rating from '@material-ui/lab/Rating';

import styles from './style.module.scss';
import { useHistory } from 'react-router-dom';
import { AppRoutes } from '../../../../routes/routes-const';

type FilmTypes = {
	title: string;
	rating: number;
	image: string;
	id: string;
}

const Film: React.FC<FilmTypes> = ({ title, rating, image, id }) => {
	const history = useHistory();

	const handlerDedailedRedirect = () => {
		history.push(AppRoutes.FILM_DETAILED + '/' + id);
	};

	return (
		<div className={styles.filmContainer} onClick={handlerDedailedRedirect}>
			<div className={styles.imageContainer}>
				<div className={styles.filmImage}>
					<img src={image} alt="movie"/>
				</div>
			</div>

			<div className={styles.filmData}>
				<div className={styles.filmTitle}>{title}</div>
				<div className={styles.filmRating}>
					<Rating
						name="read-only"
						value={rating}
						readOnly
					/>
				</div>
			</div>
		</div>
	);
};

export default Film;
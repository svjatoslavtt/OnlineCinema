import React from 'react';
import Rating from '@material-ui/lab/Rating';

import styles from './style.module.scss';
import { useHistory } from 'react-router-dom';
import { AppRoutes } from '../../../routes/routes-const';
import image404 from '../../../static/images/image404.jpg';

type FilmTypes = {
	title: string;
	image: string;
	id: string;
	averageRating: number;
	owner?: string;
};

const Film: React.FC<FilmTypes> = ({ title, averageRating, image, id }) => {
	const history = useHistory();

	const handlerDedailedRedirect = () => {
		history.push(AppRoutes.BOOK_DETAILED + '/' + id);
	};

	return (
		<div className={styles.filmContainer} onClick={handlerDedailedRedirect}>
			<div className={styles.imageContainer}>
				<div className={styles.filmImage}>
					<img src={undefined || image404} alt="movie"/>
				</div>
			</div>

			<div className={styles.filmRatingAsNumer}>{averageRating.toFixed(1)}</div>

			<div className={styles.filmData}>
				<div className={styles.filmTitle}>{title}</div>
				<div className={styles.filmRating}>
					<Rating
						name="read-only"
						value={averageRating}
						precision={0.1}
						readOnly
					/>
				</div>
			</div>
		</div>
	);
};

export default Film;
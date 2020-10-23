import React from 'react';
import Rating from '@material-ui/lab/Rating';

import styles from './style.module.scss';
import { useHistory } from 'react-router-dom';
import { AppRoutes } from '../../../routes/routes-const';
import LikeSvg from '../Icons/Likes/Like';

type FilmTypes = {
	title: string;
	image: string;
	id: string;
	averageRating: number;
	owner?: string;
	likes: number;
}

const Film: React.FC<FilmTypes> = ({ title, averageRating, image, id, likes }) => {
	const history = useHistory();

	const handlerDedailedRedirect = () => {
		history.push(AppRoutes.FILM_DETAILED + '/' + id);
	};

	return (
		<div className={styles.filmContainer} onClick={handlerDedailedRedirect}>
			<div className={styles.imageContainer}>
				<div className={styles.filmImage}>
					<img src={image} alt="movie"/>
					<div className={styles.imageLayoutContainer}>
						<div className={styles.imageLayout}>
							<LikeSvg />
							<span>{likes}</span>
						</div>	
					</div>
				</div>
			</div>

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
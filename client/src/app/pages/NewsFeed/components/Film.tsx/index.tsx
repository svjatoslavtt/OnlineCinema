import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';

import styles from './style.module.scss';

import image from '../../../../static/images/film.jpeg';

const Film: React.FC = () => {
	const [value] = useState<number | null>(2.5);

	return (
		<div className={styles.filmContainer}>
			<div className={styles.filmImage}>
				<img src={image} alt="movie"/>
			</div>

			<div className={styles.filmData}>
				<div className={styles.filmTitle}>Место под соснами</div>
				<div className={styles.filmRating}>
					<Rating
						name="read-only"
						value={value}
						readOnly
					/>
				</div>
			</div>
		</div>
	)
}

export default Film;
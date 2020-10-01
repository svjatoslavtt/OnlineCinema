import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';

import styles from './style.module.scss';

type FilmProps = {
	title: string;
	rating: number;
	image: string;
}

const Film: React.FC<FilmProps> = ({ title, rating, image }) => (
	<div className={styles.filmContainer}>
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

export default Film;
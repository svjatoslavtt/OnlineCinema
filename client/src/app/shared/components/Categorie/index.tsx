import React from 'react';

import styles from './style.module.scss';

import Film from '../Film';
import Title from '../Title';
import { FilmTypes } from '../../../redux/films/types';

type CategorieTypes = {
	title: string;
	data?: FilmTypes[] | null;
	heartSvg?: boolean;
	uploadFilm?: boolean;
	goBack?: boolean;
}

const Categorie: React.FC<CategorieTypes> = ({ title, data, heartSvg, uploadFilm, goBack }) => {
	return (
		<div className={styles.categorie}>
			
			<Title title={title} heartSvg={heartSvg} uploadFilm={uploadFilm} goBack={goBack} />

			<div className={styles.categorieFilmsWrapper}>
				{data && data.length ? 
					data.map(({ id, title, averageRating, image }) => {
						return (
							<Film 
								key={`${id}-${Math.round(Math.random() * 10000)}`}
								title={title}
								averageRating={averageRating}
								image={image}
								id={id}
						/>
						)
					}) : (
						<div className={styles.emptyData}>Фильмов пока нет</div>
					)
				}
			</div>
		</div>
	)
}

export default Categorie;
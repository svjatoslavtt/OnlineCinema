import React from 'react';

import styles from './style.module.scss';

import Film from '../Film.tsx';
import Title from '../Title';
import { FilmTypes } from '../../../redux/films/reducer';

type CategorieTypes = {
	title: string;
	data?: FilmTypes[] | null;
}

const Categorie: React.FC<CategorieTypes> = ({ title, data }) => {
	return (
		<div className={styles.categorie}>
			
			<Title title={title} />

			<div className={styles.categorieFilmsWrapper}>
				{data && data.length ? 
					data.map(({ id, title, rating, image }) => {
						return (
							<Film 
								key={`${id}-${Math.round(Math.random() * 10000)}`}
								title={title}
								rating={rating}
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
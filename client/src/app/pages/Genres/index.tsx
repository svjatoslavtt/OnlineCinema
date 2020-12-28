import React from 'react';

import styles from './style.module.scss';

import Banner from '../../shared/components/Banner';
import Footer from '../../shared/components/Footer';
import Header from '../../shared/components/Header';
import { GENRES } from '../Home/data/genres';

const Genres: React.FC = () => {
	return (
		<>
			<Header />
			<Banner title='Жанры' />

			<main className={styles.container}>
				<section className={styles.search}>
					<input type="text" name="genres-search" placeholder="Поиск жанра" />
				</section>

				<section className={styles.genres}>
					{GENRES.map((item, idx) => {
						return (
							<div key={idx} className={styles.genre}>
								<div className={styles.image}>
									<img src={item.image} alt={item.name} />
								</div>
								
								<div className={styles.text}>
									<div className={styles.link}>
										{item.name}
									</div>
								</div>
							</div>
						)
					})}
				</section>
			</main>

			<Footer />
		</>
	);
};

export default Genres;
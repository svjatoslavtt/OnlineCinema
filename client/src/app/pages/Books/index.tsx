import React from 'react';
import 'react-widgets/dist/css/react-widgets.css';

import styles from './style.module.scss';
import Sort from './components/Sort';
import Filter from './components/Filter';
import Banner from './components/Banner';
import { FILTER_DATA } from './components/Filter/filter-data';

import Header from '../../shared/components/Header';
import Footer from '../../shared/components/Footer';
import { BOOKS } from '../Home/data/books-data';
import Book from '../../shared/components/BookItem';

const Books: React.FC = () => {
	return (
		<>
			<Header />

			<Banner />

			<main className={styles.container}>
				<Sort />

				<div className={styles.content}>
					<Filter data={FILTER_DATA}  />

					<section className={styles.products}>
						<div className={styles.producrsWrapper}>
							{BOOKS.map(({ id, sale, image, name, oldPrice, currentPrice }) => {
								return (
									<Book 
										key={id}
										sale={sale}
										image={image}
										name={name}
										oldPrice={oldPrice}
										currentPrice={currentPrice}
									/>
								)
							})}
						</div>
					</section>
				</div>
			</main>

			<Footer />
		</>
	);
};

export default Books;
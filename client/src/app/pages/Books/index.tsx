import React from 'react';
import 'react-widgets/dist/css/react-widgets.css';

import styles from './style.module.scss';
import Sort from './components/Sort';
import Filter from './components/Filter';
import Banner from './components/Banner';

import Header from '../../shared/components/Header';
import Footer from '../../shared/components/Footer';

const Books: React.FC = () => {
	return (
		<>
			<Header />

			<Banner />

			<main className={styles.container}>
				<Sort />

				<div className={styles.content}>
					<Filter />

					<section className={styles.products}></section>
				</div>
			</main>

			<Footer />
		</>
	);
};

export default Books;
import React, { useState } from 'react';
import 'react-widgets/dist/css/react-widgets.css';

import styles from './style.module.scss';
import Sort from './components/Sort';
import Filter from './components/Filter';
import { FILTER_DATA } from './components/Filter/filter-data';

import { BOOKS } from '../Home/data/books-data';

import Banner from '../../shared/components/Banner';
import Header from '../../shared/components/Header';
import Footer from '../../shared/components/Footer';
import Products, { ProductDisplayTypeEnum } from '../../shared/components/Products';

const Books: React.FC = () => {
	const [booksType, setBooksType] = useState<ProductDisplayTypeEnum>(ProductDisplayTypeEnum.LIST);

	return (
		<>
			<Header />

			<Banner />

			<main className={styles.container}>
				<Sort setBooksType={setBooksType} />

				<div className={styles.content}>
					<Filter data={FILTER_DATA}  />

					<section className={styles.products}>
						<Products 
							data={BOOKS}
							productDisplayType={booksType}
						/>
					</section>
				</div>
			</main>

			<Footer />
		</>
	);
};

export default Books;
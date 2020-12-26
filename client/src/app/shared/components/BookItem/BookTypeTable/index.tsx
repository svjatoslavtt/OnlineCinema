import React from 'react';

import styles from './style.module.scss';

import Badge from '../components/Badge';
import Buttons from '../components/Buttons';
import Price from '../components/Price';

type BookTypes = {
	sale?: number;
	image: string;
	name: string;
	price: number;
	unsalePrice?: number;
	bigGrid?: boolean;
	badge?: string;
};

const BookTypeTable: React.FC<BookTypes> = ({ sale, image, name, price, unsalePrice, bigGrid, badge }) => {

	const bookStyles = [
		bigGrid ? styles.bookBigGrid : styles.book
	];

	return (
		<div className={bookStyles.join(' ')}>
			{badge && <Badge badge={badge} />}

			<div className={styles.bookImage}>
				<img src={image} alt="book of sale"/>
			</div>

			<div className={styles.bookInfo}>
				<Price price={price} unsalePrice={unsalePrice} sale={sale} />

				<div className={styles.bookName}>{name.length > 50 ? name.substring(0, 50) + '...' : name}</div>
			</div>

			<Buttons />
		</div>
	);
};

export default BookTypeTable;
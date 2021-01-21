import React from 'react';

import styles from './style.module.scss';

import Badge from '../components/Badge';
import Buttons from '../components/Buttons';
import Price from '../components/Price';
import { NavLink } from 'react-router-dom';
import App from '../../../../App';
import { AppRoutes } from '../../../../routes/routes-const';

type BookTypes = {
	id: string;
	file: string;
	title: string;
	price: number;
	discountPrice: number;
	discountPercent: number;
	bigGrid?: boolean;
	badge?: string;
	isSaved: boolean;
};

const BookTypeTable: React.FC<BookTypes> = ({ id, file, title, bigGrid, badge, price, discountPrice, discountPercent, isSaved }) => {

	const bookStyles = [
		bigGrid ? styles.bookBigGrid : styles.book
	];
	
	return (
		<div className={bookStyles.join(' ')}>
			{badge && <Badge badge={badge} />}

			<NavLink to={AppRoutes.BOOK_DETAILED + '/' + id}>
				<div className={styles.bookImage}>
					{file ? (
						<img src={file} alt="book of sale"/>
					) : (
						<p>image</p>
					)}
				</div>
			</NavLink>

			<div className={styles.bookInfo}>
				<Price discountPrice={discountPrice} price={price} discountPercent={discountPercent} />

				<div className={styles.bookName}>{title.length > 50 ? title.substring(0, 50) + '...' : title}</div>
			</div>

			<Buttons bookId={id} isSaved={isSaved} />
		</div>
	);
};

export default BookTypeTable;
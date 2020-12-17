import React from 'react';

import styles from './style.module.scss';

type BookTypes = {
	sale?: number;
	image: string;
	name: string;
	oldPrice?: number;
	currentPrice: number;
	bigGrid?: boolean;
};

const Book: React.FC<BookTypes> = ({ sale, image, name, oldPrice, currentPrice, bigGrid }) => {

	const bookStyles = [
		bigGrid ? styles.bookBigGrid : styles.book
	];

	return (
		<div className={bookStyles.join(' ')}>
			<div className={styles.bookBadge}>{`-${sale}%`}</div>

			<div className={styles.bookImage}>
				<img src={image} alt="book of sale"/>
			</div>

			<div className={styles.bookInfo}>
				<div className={styles.bookName}>{name}</div>
				
				<div className={styles.bookPrice}>
					<span className={styles.oldPrice}>{`${oldPrice} ₴`}</span>
					<span className={styles.currentPrice}>{`${currentPrice} ₴`}</span>
				</div>
			</div>

			<div className={styles.bookActions}>
				<div className={styles.addToFavorite}><i className="fas fa-heart"></i></div>
				<button className={styles.addToCart}>Add to cart</button>
				<div className={styles.bookDetails}><i className="fas fa-search"></i></div>
			</div>
		</div>
	);
};

export default Book;
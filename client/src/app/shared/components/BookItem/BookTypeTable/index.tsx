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

const BookTypeTable: React.FC<BookTypes> = ({ sale, image, name, oldPrice, currentPrice, bigGrid }) => {

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
				<div className={styles.bookPrice}>
					<div className={styles.currentPrice}>
						{currentPrice}
						<span>грн.</span>
					</div>

					<div className={styles.oldPrice}>
						<div className={styles.priceCount}>
							{oldPrice}
							<span>грн.</span>
						</div>

						<div className={styles.badgeSale}>-10%</div>
					</div>

					
				</div>

				<div className={styles.bookName}>{name}</div>
			</div>

			<div className={styles.bookActions}>
				<button className={styles.addToCart}>В корзину</button>
				<div className={styles.addToFavorite}><i className="far fa-heart" title="Добавить к себе"></i></div>
			</div>
		</div>
	);
};

export default BookTypeTable;
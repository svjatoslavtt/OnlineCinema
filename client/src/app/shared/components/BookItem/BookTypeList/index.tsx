import Rating from '@material-ui/lab/Rating';
import React from 'react';

import styles from '../style.module.scss';

type BookTypes = {
	sale?: number;
	image: string;
	name: string;
	oldPrice?: number;
	currentPrice: number;
	description: string;
	year: number;
	author: string;
};

const BookTypeList: React.FC<BookTypes> = ({ sale, image, name, oldPrice, currentPrice, description, year, author }) => {

	return (
		<div className={styles.book}>
			<div className={styles.bookBadge}>{`-${sale}%`}</div>

			<div className={styles.bookImage}>
				<img src={image} alt="book of sale"/>
			</div>

			<div className={styles.bookContent}>
				<div className={styles.bookInfo}>
					<div className={styles.bookHeadInfo}>
						<div className={styles.bookName}>{name}</div>
						
						<div className={styles.bookPrice}>
							<span className={styles.oldPrice}>{`${oldPrice} ₴`}</span>
							<span className={styles.currentPrice}>{`${currentPrice} ₴`}</span>
						</div>
					</div>

					<div className={styles.bookAdditionalInfo}>
						<span className={styles.bookYear}>{year}</span>
						<span className={styles.bookAuthor}>{author}</span>
					</div>

					<div className={styles.description}>
						{description.length > 350 ? description.substring(0, 350) + '...' : description}
					</div>
				</div>

				<div className={styles.bookActions}>
					<div className={styles.bookRating}>
						<Rating
							name="read-only"
							value={5.0}
							precision={0.1}
							readOnly
						/>
					</div>

					<div className={styles.bookButtons}>
						<div className={styles.addToFavorite}><i className="fas fa-heart"></i></div>
						<button className={styles.addToCart}>Add to cart</button>
						<div className={styles.bookDetails}><i className="fas fa-search"></i></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookTypeList;
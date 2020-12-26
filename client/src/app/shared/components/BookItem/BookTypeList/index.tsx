import React from 'react';
import Rating from '@material-ui/lab/Rating';

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
	description: string;
	year: number;
	author: string;
	badge?: string;
};

const BookTypeList: React.FC<BookTypes> = ({ sale, image, name, price, unsalePrice, description, year, author, badge }) => {

	return (
		<div className={styles.book}>
			{badge && <Badge badge={badge} />}

			<div className={styles.bookImage}>
				<img src={image} alt="book of sale"/>
			</div>

			<div className={styles.bookContent}>
				<div className={styles.bookInfo}>
					<div className={styles.bookHeadInfo}>
						<div className={styles.bookName}>{name}</div>
						
						<Price price={price} unsalePrice={unsalePrice} sale={sale} />
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

					<div className={styles.buttonsWrapper}>
						<Buttons />
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookTypeList;
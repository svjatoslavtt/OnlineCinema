import React from 'react';
import Rating from '@material-ui/lab/Rating';

import styles from './style.module.scss';

import Badge from '../components/Badge';
import Buttons from '../components/Buttons';
import Price from '../components/Price';

type BookTypes = {
	id: string;
	file: string;
	title: string;
	price: number;
	description: string;
	yearOfPublish: number;
	author: string;
	badge?: string;
	discountPrice?: number;
	discountPercent?: number;
	isSaved: boolean;
};

const BookTypeList: React.FC<BookTypes> = ({ id, file, title, price, description, yearOfPublish, author, badge, discountPercent, discountPrice, isSaved }) => {

	return (
		<div className={styles.book}>
			{badge && <Badge badge={badge} />}

			<div className={styles.bookImage}>
				<img src={file} alt="book of sale"/>
			</div>

			<div className={styles.bookContent}>
				<div className={styles.bookInfo}>
					<div className={styles.bookHeadInfo}>
						<div className={styles.bookName}>{title}</div>
						
						<Price price={price} discountPercent={discountPercent} discountPrice={discountPrice} />
					</div>

					<div className={styles.bookAdditionalInfo}>
						<span className={styles.bookYear}>{yearOfPublish}</span>
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
						<Buttons bookId={id} isSaved={isSaved} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookTypeList;
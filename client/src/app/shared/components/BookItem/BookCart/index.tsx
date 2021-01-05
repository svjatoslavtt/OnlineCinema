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

const BookCart: React.FC<BookTypes> = ({ sale, image, name, price, unsalePrice, description, year, author, badge }) => {

	return (
		<div className={styles.book}>
			<div className={styles.bookImage}>
				{badge && <Badge badge={badge} />}
				<img src={image} alt="book of sale"/>
			</div>

			<div className={styles.bookContent}>
				<div className={styles.bookInfo}>
					<div className={styles.bookHeadInfo}>
						<div className={styles.bookName}>{name}</div>
						
						<Price price={price} unsalePrice={unsalePrice} sale={sale} />
					</div>

					<div className={styles.bookAdditionalInfo}>
						<span>{author}</span>

						<div className={styles.weight}>
							<i className="fas fa-balance-scale"></i>
							0.49 кг
						</div>
					</div>
				</div>

				<div className={styles.bookActions}>
					<div className={styles.sale}>
						<i className="fas fa-info-circle"></i>
						Акционный товар
					</div>

					<div className={styles.buttonsWrapper}>
						<div className={styles.saveBook}>
							<i className="fas fa-bookmark" title="Сохранить книгу" />
							Отложить
						</div>

						<div className={styles.deleteBook}>
							<i className="far fa-trash-alt"></i>
							Удалить
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookCart
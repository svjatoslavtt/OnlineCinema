import React from 'react';
import Rating from '@material-ui/lab/Rating';

import styles from './style.module.scss';
import { useHistory } from 'react-router-dom';
import { AppRoutes } from '../../../routes/routes-const';
import image404 from '../../../static/images/image404.jpg';

type BookTypes = {
	title: string;
	image: string;
	id: string;
	averageRating: number;
	owner?: string;
};

const Book: React.FC<BookTypes> = ({ title, averageRating, image, id }) => {
	const history = useHistory();

	const handlerDedailedRedirect = () => {
		history.push(AppRoutes.BOOK_DETAILED + '/' + id);
	};

	return (
		<div className={styles.bookContainer} onClick={handlerDedailedRedirect}>
			<div className={styles.imageContainer}>
				<div className={styles.bookImage}>
					<img src={image || image404} alt="movie"/>
				</div>
			</div>

			<div className={styles.bookRatingAsNumer}>{averageRating.toFixed(1)}</div>

			<div className={styles.bookData}>
				<div className={styles.bookTitle}>{title}</div>
				<div className={styles.bookRating}>
					<Rating
						name="read-only"
						value={averageRating}
						precision={0.1}
						readOnly
					/>
				</div>
			</div>
		</div>
	);
};

export default Book;
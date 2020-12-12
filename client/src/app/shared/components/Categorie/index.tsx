import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';

import styles from './style.module.scss';

import Book from '../Book';
import Title from '../Title';
import { BookTypes } from '../../../redux/books/types';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterTags } from '../../../redux/filter/selectors';
import { Actions } from '../../../redux/filter/actions';
import { getLoading } from '../../../redux/loading/selectors';

type CategorieTypes = {
	title: string;
	data?: BookTypes[] | null;
	heartSvg?: boolean;
	uploadBook?: boolean;
	goBack?: boolean;
	newsFeed?: boolean;
}

const Categorie: React.FC<CategorieTypes> = ({ title, data, heartSvg, uploadBook, goBack, newsFeed }) => {
	const dispatch = useDispatch();
	const tags = useSelector(getFilterTags);
	const loading = useSelector(getLoading);
	const history = useHistory();

	const handlerResetFilter = () => {
		history.push('/');
		dispatch(Actions.resetFilter());
	};

	const loadingStyle = [styles.categorie, !data?.length && styles.loadingForEmpty];
	
	return (
		<div className={loadingStyle.join(' ')}>
			
			<Title title={title} heartSvg={heartSvg} uploadBook={uploadBook} goBack={goBack} newsFeed={newsFeed} />

			{title === 'Все книги' && tags && tags.length && (
				<div className={styles.tagsBlock}>
					<div className={styles.tagsTitle}>Поиск по:</div>
					<div className={styles.tagsWrapper}>
						{
							tags.map((item, index) => {
								const key = Math.round(Math.random() * 999);
								return (
									<div key={`tag-${index}-${key}`}>
										{item}
									</div>
							)})
						}
					</div>
					<div className={styles.resetFilterButton} onClick={handlerResetFilter}>
						<CloseIcon />
					</div>
				</div>
			)}

		<div className={styles.categorieBooksWrapper}>
				{loading && (
					<div className={styles.loadingBlock}>
						<span>Загрузка...</span>
					</div>
				)}
				<div className={styles.booksContainer}>
					{data && data.length ? 
						data.map(({ id, title, averageRating, image, owner }) => {
							return (
								<Book 
									key={`${id}-${Math.round(Math.random() * 10000)}`}
									title={title}
									averageRating={averageRating}
									image={image}
									id={id}
									owner={owner}
							/>
							)
						}) : null
					}
					{!loading && data && !data.length && (
						<div className={styles.emptyData}>Книг пока нет</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Categorie;
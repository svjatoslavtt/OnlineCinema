import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import styles from './style.module.scss';

import Film from '../Film';
import Title from '../Title';
import { FilmTypes } from '../../../redux/films/types';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterTags } from '../../../redux/filter/selectors';
import { Actions } from '../../../redux/filter/actions';
import { getLoading } from '../../../redux/loading/selectors';

type CategorieTypes = {
	title: string;
	data?: FilmTypes[] | null;
	heartSvg?: boolean;
	uploadFilm?: boolean;
	goBack?: boolean;
}

const Categorie: React.FC<CategorieTypes> = ({ title, data, heartSvg, uploadFilm, goBack }) => {
	const dispatch = useDispatch();
	const tags = useSelector(getFilterTags);
	const loading = useSelector(getLoading);

	const handlerResetFilter = () => dispatch(Actions.resetFilter());

	const loadingStyle = [styles.categorie, !data?.length && styles.loadingForEmpty];
	
	return (
		<div className={loadingStyle.join(' ')}>
			
			<Title title={title} heartSvg={heartSvg} uploadFilm={uploadFilm} goBack={goBack} />

			{title === 'Все фильмы' && tags && tags.length && (
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

			<div className={styles.categorieFilmsWrapper}>
				{loading && (
					<div className={styles.loadingBlock}>
						<span>Загрузка...</span>
					</div>
				)}
				<div className={styles.filmsContainer}>
					{data && data.length && 
						data.map(({ id, title, averageRating, image }) => {
							return (
								<Film 
									key={`${id}-${Math.round(Math.random() * 10000)}`}
									title={title}
									averageRating={averageRating}
									image={image}
									id={id}
							/>
							)
						})
					}
					{!loading && !data && (
						<div className={styles.emptyData}>Фильмов пока нет</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Categorie;
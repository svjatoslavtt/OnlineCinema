import Rating from '@material-ui/lab/Rating';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './style.module.scss';

import { Actions } from '../../redux/films/action';
import { getCurrentFilm } from '../../redux/films/selectors';
import Title from '../../shared/components/Title';
import Like from '../../shared/components/Icons/Like';
import { getLoading } from '../../redux/loading/selectors';


const FilmDetailed: React.FC = () => {
	const { id }: { id: string } = useParams();
	const dispatch = useDispatch();
	const currentFilm = useSelector(getCurrentFilm);
	const [rating, setRating] = useState<number | null>(0);
	const loading = useSelector(getLoading);

	useEffect(() => {
		if (currentFilm) {
			setRating(currentFilm.rating);
		}
		
	}, [currentFilm]);

	useEffect(() => {
		dispatch(Actions.getCurrentFilmRequest({id}));
	}, [dispatch]);

	return (
		<div className={styles.filmDetailedContainer}>
			<Title title={'Подробнее: ' + `${loading ? '' : currentFilm?.title}`} goBack={true} />

			{!loading && (
				<div className={styles.filDetailedContentWrapper}>
					<div className={styles.imageBlock}>
						<div className={styles.imageWrapper}>
							<img src={currentFilm?.image} alt={currentFilm?.title} />
						</div>
					</div>
					<div className={styles.infoBlock}>
						<div className={styles.title}>{currentFilm?.title}</div>
						<div className={styles.description}>{currentFilm?.description}</div>
						<div className={styles.rating}>
							<Rating
								name='simple-controlled'
								value={rating}
								onChange={(_, newValue) => {
									setRating(newValue);
								}}
							/>
						</div>
						<div className={styles.likesBlock}>
							<Like />
							<span className={styles.likes}>{currentFilm?.likes}</span>
							</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default FilmDetailed;
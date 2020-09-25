import Rating from '@material-ui/lab/Rating';
import React, { useState } from 'react';

import styles from './style.module.scss';

import Button from '../../../../shared/components/Button';

const UploadFilm: React.FC = () => {
	const [value, setValue] = useState<number | null>(0);

	const handleSubmit = () => console.log(true);

	return (
		<div>
			<div className={styles.uploadFilmTitle}>
				Загрузить фильм
			</div>

			<div className={styles.uploadFilmWrapper}>
				<div className={styles.uploadFilmImageWrapper}>
					<span className={styles.uploadFilmText}>Загрузите картинку для фильма</span>	
					<div className={styles.uploadFilmImage}>
						<span>avatar</span> 
					</div>
					<Button text='Загрузить' onClick={handleSubmit} />
				</div>

				<div className={styles.uploadFilmFields}>
					<div className={styles.filed}>
						<label htmlFor="1" className={styles.uploadFilmText}>Название</label>
						<input id="1" type="text"/>
					</div>

					<div className={styles.filed}>
						<label htmlFor="2" className={styles.uploadFilmText}>Описание</label>
						<textarea id="2" />
					</div>

					<div className={styles.uploadFilmRating}>
						<span className={styles.uploadFilmText}>Выберите рейтинг фильма</span>
						<Rating
							name="simple-controlled"
							value={value}
							onChange={(event, newValue) => {
								setValue(newValue);
							}}
						/>
					</div>

					<Button text='Сохранить' onClick={handleSubmit} />
				</div>
			</div>
		</div>
	)
}

export default UploadFilm;